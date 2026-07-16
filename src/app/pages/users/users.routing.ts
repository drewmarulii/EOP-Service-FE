import { Routes } from "@angular/router";
import { LoginComponent } from "./login/user-login.component";

export const userRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];