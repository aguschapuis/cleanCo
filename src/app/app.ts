import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth';
import { LoguedInGuard } from './guards/logued-in-guard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, JsonPipe],
  providers: [LoguedInGuard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  // template: `
  //   <ul>
  //     @for (item of (item$ | async); track item) {
  //     <li>
  //       {{ item['name'] }}
  //     </li>
  //     }
  //   </ul>
  // `,
})
export class App {
  protected title = 'cleanCo';

  constructor(public auth: AuthService) {}

  // firestore = inject(Firestore);
  // itemCollection = collection(this.firestore, 'items');
  // item$ = collectionData(this.itemCollection);
}
