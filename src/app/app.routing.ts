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
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserDetailComponent } from './pages/users/profile/user-profile.component';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'dashboard',
		component: BaseComponent,
		canActivate: [authGuard],
		canActivateChild: [roleGuard],
		data: {
			roles: ['ADMIN', 'TREASURER']
		},
		children: [
			{
				path: '',
				component: DashboardComponent
			}
		]
	},
	{
		path: 'users',
		component: BaseComponent,
		canActivate: [authGuard],
		canActivateChild: [roleGuard],
		data: {
			roles: ['ADMIN']
		},
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
				path: 'edit/:id',
				component: UserEditComponent
			},
			{
				path: 'detail/:id',
				component: UserDetailComponent
			}
		]
	},
	{
		path: 'not-found',
		component: NotFoundComponent
	},
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: 'not-found'
	}
];
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