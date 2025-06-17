import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  user,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  user$ = authState(this.auth);
  currentUser = this.auth.currentUser;
  // public user = this.auth.onAuthStateChanged;
  // user = this.auth.currentUser;

  constructor() {}

  login({ email, password }: { email: string; password: string }) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }
}
