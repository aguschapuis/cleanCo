import { Injectable } from '@angular/core';

import { CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { map, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoguedInGuard implements CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivateChild() {
    return this.auth.user$.pipe(
      take(1),
      map((user) => {
        const isLoggedIn = user;
        if (isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
