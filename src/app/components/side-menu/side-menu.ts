import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { CursorPointer } from '../../directives/cursor-pointer';
import { AuthService } from '../../services/auth';
import { CreateArrivalModal } from '../create-arrival-modal/create-arrival-modal';

@Component({
  selector: 'app-side-menu',
  imports: [FontAwesomeModule, CursorPointer, RouterLink, CreateArrivalModal],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
})
export class SideMenu {
  menuIcon = faBars;
  constructor(public auth: AuthService, public router: Router) {}

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}
