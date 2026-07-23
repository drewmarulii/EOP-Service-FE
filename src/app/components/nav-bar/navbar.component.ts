import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { MenuItem } from "primeng/api";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html'
})
export class NavBarComponent {
	uid!: string;
	role!: string;
	items: MenuItem[] = [
		{
			label: 'Dashboard',
			icon: 'pi pi-home',
			routerLink: '/dashboard'
		},
		{
			label: 'Users',
			icon: 'pi pi-users',
			items: [
				{
					label: 'User List',
					icon: 'pi pi-list',
					routerLink: '/users'
				},
				{
					label: 'Create User',
					icon: 'pi pi-user-plus',
					routerLink: '/users/register'
				}
			]
		},
		{
			label: 'Events',
			icon: 'pi pi-calendar',
			items: [
				{
					label: 'Event List',
					icon: 'pi pi-list',
					routerLink: '/events'
				},
				{
					label: 'Create Event',
					icon: 'pi pi-plus',
					routerLink: '/events/create'
				}
			]
		},
		{
			label: 'Announcements',
			icon: 'pi pi-megaphone',
			routerLink: '/announcements'
		}
	];
	profile: MenuItem[] | undefined
	imageUrl!: string

	constructor(
		private authService: AuthService,
		private router: Router
	) { }

	ngOnInit(): void {
		const uid = this.authService.getUid();
		const role = this.authService.getRole();
		this.uid = uid ? uid : '';
		this.role = role ? role : '';
	}

	onLogout(): void {
		localStorage.clear()
		this.router.navigate(['/login']);
	}
}