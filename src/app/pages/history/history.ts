import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { Arrivals } from '../../services/arrivals';
import { GenericPaginatedTable } from '../../components/generic-paginated-table/generic-paginated-table';
import { CommonModule } from '@angular/common';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Crews } from '../../services/crews';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormField } from '../../components/generic-modal-form/generic-modal-form';
import { DateHelpers } from '../../helpers/dateHelpers';
@Component({
  selector: 'app-history',
  imports: [
    ReactiveFormsModule,
    GenericPaginatedTable,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
  ],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
  today = new Date();
  dateInput = new FormControl(this.today.toISOString().substring(0, 10));
  dayArrivals: any[] = [];
  removeIcon = faTrash;
  crews: any[] = [];
  loading = false;

  formFields: FormField[] = [
    {
      initialValue: '',
      inputType: 'text',
      name: 'code',
      validators: [],
      placeholder: 'Numero de coche',
    },
    {
      initialValue: DateHelpers.getCurrentTimeString(),
      inputType: 'time',
      name: 'date',
      validators: [],
    },
    {
      initialValue: '',
      inputType: 'text',
      name: 'observations',
      validators: [],
      placeholder: 'Observaciones',
    },
  ];

  onSubmit = (values: any) => {
    const date = new Date();
    const dateData = values.date.split(':');
    date.setHours(dateData[0], dateData[1]);
    this.arrivalService.createArrival({
      code: values.code,
      date: date.toString(),
      observations: values.observations,
    });
  };

  tableTitles = [
    'Fecha',
    'Nro Coche',
    'Horario ingreso',
    'Observaciones',
    'Limpiado por',
    'Estado',
    'Eliminar',
  ];

  createInfo = {
    buttonText: '+ Crear ingreso',
    modalTitle: 'Ingresar nuevo coche',
  };

  getStateString(state: number) {
    switch (state) {
      case 1: {
        return 'Asignado';
      }
      case 2: {
        return 'Limpiado';
      }
      case 3: {
        return 'Auxilio';
      }
      default: {
        return 'Ingresado';
      }
    }
  }

  constructor(
    private arrivalService: Arrivals,
    private crewService: Crews,
    private cdr: ChangeDetectorRef
  ) {
    this.loading = true;
    this.arrivalService.loadSpecificDay(this.today.toUTCString());
    if (this.arrivalService.arrivals$) {
      console.log('subscripto');
      this.arrivalService.arrivals$.subscribe((arrivals) => {
        console.log('arrivals', arrivals);
        this.dayArrivals = arrivals;
        this.loading = false;
      });
    }

    crewService.crews$.subscribe((crewsList) => {
      this.crews = crewsList;
    });
  }

  onRemove(id: string) {
    this.arrivalService.removeArrival(id);
  }

  async onChangeCleaner(arrivalId: string, crewId: Event) {
    const cleaner = this.crews.find((c) => c.id === crewId);
    await this.arrivalService.updateArrival(arrivalId, {
      cleaner: { id: cleaner.id, name: cleaner.name },
      state: 1,
    });
  }

  callApi = () => {
    this.arrivalService.loadSpecificDay(this.today.toUTCString());
  };

  finishLoading() {
    this.loading = false;
  }

  ngOnInit(): void {
    this.dateInput.valueChanges.subscribe((dateFilter) => {
      this.dayArrivals = [];
      if (dateFilter) {
        this.loading = true;
        this.arrivalService.loadSpecificDay(dateFilter);
        if (this.arrivalService.arrivals$) {
          this.arrivalService.arrivals$.subscribe((arrivals) => {
            this.dayArrivals = arrivals;
            this.loading = false;
            this.cdr.detectChanges();
          });
        }
      }
    });
  }
}
