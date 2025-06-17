import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Arrivals } from '../../services/arrivals';

@Component({
  selector: 'app-create-arrival-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './create-arrival-modal.html',
  styleUrl: './create-arrival-modal.scss',
})
export class CreateArrivalModal {
  arrivalForm: FormGroup;

  getCurrentTimeString(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  onSubmit() {
    const date = new Date();
    const dateData = this.arrivalForm.get('date')?.value.split(':');
    date.setHours(dateData[0], dateData[1]);
    this.arrivalsService.createArrival({
      code: this.arrivalForm.get('code')?.value,
      date: date.toString(),
      observations: this.arrivalForm.get('observations')?.value,
    });
  }

  constructor(private fb: FormBuilder, private arrivalsService: Arrivals) {
    this.arrivalForm = fb.group({
      code: [''],
      date: [this.getCurrentTimeString()],
      observations: [''],
    });
  }
}
