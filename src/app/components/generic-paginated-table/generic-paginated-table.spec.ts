import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericPaginatedTable } from './generic-paginated-table';

describe('GenericPaginatedTable', () => {
  let component: GenericPaginatedTable;
  let fixture: ComponentFixture<GenericPaginatedTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericPaginatedTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericPaginatedTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
