import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Crews as CrewService } from '../../services/crews';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import {
  FormField,
  GenericModalForm,
} from '../../components/generic-modal-form/generic-modal-form';

@Component({
  selector: 'app-crews',
  imports: [FontAwesomeModule, ReactiveFormsModule, GenericModalForm],
  templateUrl: './crews.html',
  styleUrl: './crews.scss',
})
export class Crews {
  removeIcon = faTrash;
  allCrews: any[] = [];
  filtreredCrews: any[] = [];
  filterControl = new FormControl();

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

  constructor(private crewService: CrewService) {
    crewService.crews$.subscribe((crews) => {
      this.allCrews = crews;
      this.filtreredCrews = crews;
    });
  }

  ngOnInit(): void {
    this.filterControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((term: string) => {
        this.filtreredCrews = this.allCrews.filter(
          (c) => c.name.includes(term) || c.lastname.includes(term)
        );
      });
  }

  handleOnSubmit = (values: any) => {
    this.crewService.createCrew(values);
  };

  onRemove = (id: string) => {
    this.crewService.removeCrew(id);
  };
}
