import { Routes } from '@angular/router';
import { LoginComponent } from '@Pages/Auth/login/login.component';
import { RegisterComponent } from '@Pages/Auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'signin',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: RegisterComponent,
  },
];
