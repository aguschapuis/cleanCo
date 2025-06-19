import { Component } from '@angular/core';
import { Arrivals } from '../../services/arrivals';
import { CommonModule } from '@angular/common';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CursorPointer } from '../../directives/cursor-pointer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '../../components/generic-modal-form/generic-modal-form';
import { Crews } from '../../services/crews';
import { GenericPaginatedTable } from '../../components/generic-paginated-table/generic-paginated-table';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FontAwesomeModule,
    CursorPointer,
    ReactiveFormsModule,
    FormsModule,
    GenericPaginatedTable,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  removeIcon = faTrash;
  allArrivals: any[] = [];
  crews: any[] = [];

  formFields: FormField[] = [
    {
      initialValue: '',
      inputType: 'text',
      name: 'code',
      validators: [],
      placeholder: 'Numero de coche',
    },
    {
      initialValue: this.getCurrentTimeString(),
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

  getCurrentTimeString(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  onSubmit = (values: any) => {
    const date = new Date();
    const dateData = values.date.split(':');
    date.setHours(dateData[0], dateData[1]);
    this.arrivalsService.createArrival({
      code: values.code,
      date: date.toString(),
      observations: values.observations,
    });
  };

  onRemove(id: string) {
    this.arrivalsService.removeArrival(id);
  }

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

  getTimeString(date: string) {
    const formatedDate = new Date(date);
    return `${formatedDate.getHours()}:${formatedDate.getMinutes()}`;
  }

  async onChangeCleaner(arrivalId: string, crewId: Event) {
    const cleaner = this.crews.find((c) => c.id === crewId);
    await this.arrivalsService.updateArrival(arrivalId, {
      cleaner: { id: cleaner.id, name: cleaner.name },
      state: 1,
    });
  }

  ngOnInit(): void {
    this.arrivalsService.arrivals$.subscribe((arrivals) => {
      this.allArrivals = arrivals;
    });
  }

  constructor(public arrivalsService: Arrivals, private crewService: Crews) {
    crewService.crews$.subscribe((crewsList) => {
      this.crews = crewsList;
    });
  }
}
