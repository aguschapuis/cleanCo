import { Component, Input, TemplateRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  FormField,
  GenericModalForm,
} from '../generic-modal-form/generic-modal-form';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-generic-paginated-table',
  imports: [ReactiveFormsModule, GenericModalForm, CommonModule],
  templateUrl: './generic-paginated-table.html',
  styleUrl: './generic-paginated-table.scss',
})
export class GenericPaginatedTable {
  pages: any[] = [];
  currentPage = 0;
  searchControl = new FormControl('');
  filtredData: any[] = [];
  isMobile = false;

  @Input()
  formFields!: FormField[];

  @Input()
  tableTitles!: string[];

  @Input()
  createInfo!: {
    buttonText: string;
    modalTitle: string;
  };

  @Input()
  searchField!: string;

  @Input()
  searchForTitle!: string;

  @Input()
  pageSize!: number;

  @Input()
  onSubmit!: (values?: any) => void;

  @Input()
  tbodyReference!: TemplateRef<any>;

  @Input()
  data!: any[];

  ngOnInit(): void {
    this.filtredData = this.data;
    this.setPages();
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((term) => {
        this.filtredData = this.data.filter((a) =>
          a[this.searchField].includes(term)
        );
        this.setPages();
      });
    this.isMobile = window.innerWidth < 768;
  }

  ngOnChanges(changes: any): void {
    if (changes.data) {
      this.filtredData = changes.data.currentValue;
      this.setPages();
    }
  }

  setPages() {
    this.pages = Array.from(
      { length: Math.ceil(this.filtredData.length / this.pageSize) },
      (_, i) => i + 1
    );
  }

  pageData() {
    return this.filtredData.slice(
      this.currentPage * this.pageSize,
      this.currentPage * this.pageSize + this.pageSize
    );
  }

  onChangePage(page: number) {
    if (page >= 0 && page < this.pages.length) {
      this.currentPage = page;
    }
  }
}
