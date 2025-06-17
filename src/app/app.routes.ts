import { Routes } from '@angular/router';
import { LoguedInGuard } from './guards/logued-in-guard';
import { LoggedRoutes } from './routes/loggedRoutes';
import { AuthRoutes } from './routes/authRoutes';
import { Layout } from './components/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    canActivateChild: [LoguedInGuard],
    children: LoggedRoutes,
  },
  ...AuthRoutes,

  // { path: '**', redirectTo: 'login' },
];
