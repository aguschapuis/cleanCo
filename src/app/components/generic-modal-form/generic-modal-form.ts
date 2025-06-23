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
    console.log('oninit');
    const group: { [key: string]: any } = {};

    this.formFields.forEach((field) => {
      group[field.name] = [field.initialValue, field.validators];
    });

    this.formGroup = this.fb.group(group);
  }

  ngOnChanges(changes: any): void {
    console.log('changes', changes);
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  handleOnSubmit = () => {
    this.onSubmit(this.formGroup.value);

    const group: { [key: string]: any } = {};

    this.formFields.forEach((field) => {
      group[field.name] = field.initialValue;
    });

    console.log('group', group);

    this.formGroup.reset(group);
  };
}
