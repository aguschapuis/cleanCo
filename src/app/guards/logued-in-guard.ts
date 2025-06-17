import { Injectable } from '@angular/core';

import {
  CanActivate,
  CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth';
import { map, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoguedInGuard implements CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivateChild() {
    return this.auth.user$.pipe(
      take(1),
      map((user) => {
        console.log('user', user);
        const isLoggedIn = user;
        if (isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
    // console.log('activate: ', this.auth.user$);
    if (this.auth.user$ !== null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
