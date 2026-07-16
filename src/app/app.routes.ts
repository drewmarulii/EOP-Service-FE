import { Routes } from '@angular/router';
import { LoginComponent } from './pages/users/login/user-login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];
