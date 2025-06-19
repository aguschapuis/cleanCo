import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Crews as CrewService } from '../../services/crews';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField } from '../../components/generic-modal-form/generic-modal-form';
import { GenericPaginatedTable } from '../../components/generic-paginated-table/generic-paginated-table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crews',
  imports: [
    FontAwesomeModule,
    ReactiveFormsModule,
    GenericPaginatedTable,
    CommonModule,
  ],
  templateUrl: './crews.html',
  styleUrl: './crews.scss',
})
export class Crews {
  removeIcon = faTrash;
  allCrews: any[] = [];

  formFields: FormField[] = [
    {
      initialValue: '',
      inputType: 'text',
      name: 'name',
      validators: [Validators.required],
      placeholder: 'Nombre',
    },
    {
      initialValue: '',
      inputType: 'text',
      name: 'lastname',
      validators: [Validators.required],
      placeholder: 'Apellido',
    },
    {
      initialValue: '',
      inputType: 'number',
      name: 'dni',
      validators: [Validators.required, Validators.pattern(/^\d+$/)],
      placeholder: 'DNI',
    },
  ];

  tableTitles = ['DNI', 'Nombre', 'Apellido'];

  createInfo = {
    buttonText: '+ Crear empleado',
    modalTitle: 'Ingresar nuevo empleado',
  };

  constructor(private crewService: CrewService) {
    crewService.crews$.subscribe((crews) => {
      this.allCrews = crews;
    });
  }

  handleOnSubmit = (values: any) => {
    this.crewService.createCrew(values);
  };

  onRemove = (id: string) => {
    this.crewService.removeCrew(id);
  };
}
