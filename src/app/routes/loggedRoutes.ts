import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { Crews } from '../pages/crews/crews';
import { History } from '../pages/history/history';

export const LoggedRoutes: Routes = [
  { path: 'home', component: Home },
  { path: 'crews', component: Crews },
  { path: 'history', component: History },
];
