import { Routes } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [NotAuthorizedGuard],
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'registration',
    canActivate: [NotAuthorizedGuard],
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'courses',
    canLoad: [AuthorizedGuard],
    loadChildren: () =>
      import('./courses/courses.module').then(m => m.CoursesModule),
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'courses',
  },
];
