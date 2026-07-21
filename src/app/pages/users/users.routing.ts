import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/user-login.component";
import { NgModule } from '@angular/core';
import { SharedModule } from '../../components/shared-module';
import { UserRegisterComponent } from './register/user-register.component';
import { UserEditComponent } from './edit/user-edit.component';
import { UserListComponent } from './list/user-list.component';

@NgModule({
  declarations: [
    LoginComponent,
    UserRegisterComponent,
    UserEditComponent,
    UserListComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    UserRegisterComponent,
    UserEditComponent,
    UserListComponent
  ]
})
export class UserRouting {

}