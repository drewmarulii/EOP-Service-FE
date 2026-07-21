import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from './components/base/base.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './components/base/base.component';
import { SharedModule } from './components/shared-module';
import { LoginComponent } from './pages/users/login/user-login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ButtonModule } from 'primeng/button';
import { UserRegisterComponent } from './pages/users/register/user-register.component';
import { UserEditComponent } from './pages/users/edit/user-edit.component';
import { UserListComponent } from './pages/users/list/user-list.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        component: BaseComponent,
        path: 'dashboard',
        children: [{
            path: '',
            component: DashboardComponent
        }]
    },
    {
        component: BaseComponent,
        path: 'users',
        children: [
            {
                path: '',
                component: UserListComponent
            },
            {
                path: 'register',
                component: UserRegisterComponent
            },
            {
                path: 'edit',
                component: UserEditComponent
            }]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: "full"
    }
]
@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        CommonModule,
        BaseModule,
        SharedModule,
        ButtonModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting {

}