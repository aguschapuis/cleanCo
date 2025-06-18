import { Component } from '@angular/core';
import { Arrivals } from '../../services/arrivals';
import { CommonModule } from '@angular/common';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CursorPointer } from '../../directives/cursor-pointer';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import {
  FormField,
  GenericModalForm,
} from '../../components/generic-modal-form/generic-modal-form';
import { Crews } from '../../services/crews';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FontAwesomeModule,
    CursorPointer,
    ReactiveFormsModule,
    GenericModalForm,
    FormsModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  arrivals = [];
  removeIcon = faTrash;
  arrivalsPages: any[] = [];
  currentPage = 0;
  pageSize = 8;
  filtredArrivals: any[] = [];
  allArrivals: any[] = [];
  codeSearch = new FormControl('', [Validators.maxLength(5)]);
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
    console.log('remove');
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
    console.log('date', date);
    const formatedDate = new Date(date);
    return `${formatedDate.getHours()}:${formatedDate.getMinutes()}`;
  }

  onChangePage(page: number) {
    console.log('page', page);
    if (page >= 0 && page < this.arrivalsPages.length) {
      this.currentPage = page;
    }
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
      this.filtredArrivals = arrivals;
      this.allArrivals = arrivals;
    });
    console.log('filtr', this.filtredArrivals);

    // this.cleaner.valueChanges.subscribe((crew: any) => {

    // });

    this.codeSearch.valueChanges.pipe(debounceTime(300)).subscribe((term) => {
      console.log('cambiando a : ', term);
      this.filtredArrivals = this.allArrivals.filter((a) =>
        a.code.includes(term)
      );
    });
  }

  constructor(public arrivalsService: Arrivals, private crewService: Crews) {
    arrivalsService.arrivals$.subscribe((res) => {
      this.arrivalsPages = Array.from(
        { length: Math.round(res.length / this.pageSize) },
        (_, i) => i + 1
      );
    });

    crewService.crews$.subscribe((crewsList) => {
      this.crews = crewsList;
    });
  }
}
