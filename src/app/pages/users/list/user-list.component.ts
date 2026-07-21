import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

    users!: [];

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    createUser(): void {
        this.router.navigate(['/users/register']);
    }

    viewUser(id: string): void {
        this.router.navigate(['/users/view', id]);
    }

    editUser(id: string): void {
        this.router.navigate(['/users/edit', id]);
    }

    deleteUser(id: string): void {
        console.log('Delete user:', id);
    }
}