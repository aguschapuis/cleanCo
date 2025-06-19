import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-history',
  imports: [ReactiveFormsModule],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
  dateInput = new FormControl('');
}
