import { Component } from '@angular/core';
import { Arrivals } from '../../services/arrivals';
import { CommonModule } from '@angular/common';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CursorPointer } from '../../directives/cursor-pointer';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FontAwesomeModule,
    CursorPointer,
    ReactiveFormsModule,
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

  onRemove(id: string) {
    console.log('remove');
    this.arrivalsService.removeArrival(id);
  }

  getStateString(state: number) {
    switch (state) {
      case 1: {
        return 'Limpiado';
      }
      case 2: {
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

  ngOnInit(): void {
    this.arrivalsService.arrivals$.subscribe((arrivals) => {
      this.filtredArrivals = arrivals;
      this.allArrivals = arrivals;
    });
    console.log('filtr', this.filtredArrivals);

    this.codeSearch.valueChanges.pipe(debounceTime(300)).subscribe((term) => {
      console.log('cambiando a : ', term);
      this.filtredArrivals = this.allArrivals.filter((a) =>
        a.code.includes(term)
      );
    });
  }

  constructor(public arrivalsService: Arrivals) {
    arrivalsService.arrivals$.subscribe((res) => {
      this.arrivalsPages = Array.from(
        { length: Math.round(res.length / this.pageSize) },
        (_, i) => i + 1
      );
    });
  }
}
