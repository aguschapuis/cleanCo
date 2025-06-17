import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth';
import { LoguedInGuard } from './guards/logued-in-guard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [LoguedInGuard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(public auth: AuthService) {}
}
