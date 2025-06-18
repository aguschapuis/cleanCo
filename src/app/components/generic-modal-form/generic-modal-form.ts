import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';

export interface FormField {
  name: string;
  initialValue: any;
  inputType: string;
  validators: ((control: AbstractControl) => ValidationErrors | null)[];
  placeholder?: string;
}

@Component({
  selector: 'app-generic-modal-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './generic-modal-form.html',
  styleUrl: './generic-modal-form.scss',
})
export class GenericModalForm {
  formGroup: FormGroup = {} as any;

  @Input()
  formFields!: FormField[];

  @Input()
  targetId!: string;

  @Input()
  title!: string;

  @Input()
  onSubmit!: (values?: any) => void;

  constructor(private fb: FormBuilder) {
    this.formGroup = fb.group({});
  }

  isValidField = (fieldName: string) => {
    const fieldControl = this.formGroup.get(fieldName);
    return fieldControl?.touched && fieldControl?.invalid;
  };

  ngOnInit(): void {
    const group: { [key: string]: any } = {};

    this.formFields.forEach((field) => {
      group[field.name] = [field.initialValue, field.validators];
    });

    this.formGroup = this.fb.group(group);
  }

  handleOnSubmit = () => {
    this.onSubmit(this.formGroup.value);
    this.formGroup.reset();
  };
}
