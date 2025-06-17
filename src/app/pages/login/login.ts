import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth';
import { FirebaseError } from '@angular/fire/app';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  isLoading: boolean = false;
  error: boolean = false;

  isEmailInvalid() {
    const emailControl = this.loginForm.get('email');
    return emailControl?.touched && emailControl?.invalid;
  }

  isPasswordInvalid() {
    const usernameControl = this.loginForm.get('password');
    return usernameControl?.touched && usernameControl?.invalid;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.minLength(6), Validators.required, Validators.email],
      ],
      password: ['', [Validators.minLength(6), Validators.required]],
    });
  }

  async onSubmit() {
    try {
      this.error = false;
      this.isLoading = true;
      await this.authService.login(this.loginForm.value);
      this.isLoading = false;
      this.router.navigate(['/home']);
    } catch (e: any) {
      this.isLoading = false;
      this.error = true;
      console.log('Error on login', e['message']);
    }
  }
}
