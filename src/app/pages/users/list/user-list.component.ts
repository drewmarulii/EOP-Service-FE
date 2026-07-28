import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { TableColumn } from '../../../components/table/table.component';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  title = 'User List';

  columns: TableColumn[] = [
    { key: 'no', label: 'No', type: 'index', width: '4rem' },
    { key: 'nik', label: 'NIK' },
    { key: 'fullName', label: 'Name' },
    { key: 'mobilePhone', label: 'Phone Number'},
    { key: 'email', label: 'Email'},
  ];

  statusOptions: [] = [];

  data: any[] = [];
  totalRecords = 0;
  loading = false;

  private currentRows = 10;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchUsers({ first: 0, rows: 10, search: '', status: null });
  }

  fetchUsers(params: { first: number; rows: number; search: string; status: any }): void {
    this.loading = true;
    this.currentRows = params.rows;
    const page = Math.floor(params.first / params.rows);

    this.userService
      .getList({ page, size: params.rows }, params.search || undefined)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.data = res.data;
          this.totalRecords = res.paging?.totalElements ?? res.data.length;
        },
        error: (err) => { }
      });
  }

  onAdd(): void {
    this.router.navigate(['/users/register']);
  }

  onRowAction(event: { action: string; row: any; index: number }): void {
    const { action, row } = event;

    switch (action) {
      case 'detail':
        this.router.navigate(['/users', row.id]);
        break;
      case 'edit':
        this.router.navigate(['/users', row.id, 'edit']);
        break;
      case 'delete':
        this.deleteUser(row.id);
        break;
      default:
        console.warn(`Unhandled action: ${action}`);
    }
  }

  onDeleteSelected(rows: any[]): void {
    this.deleteUsers(rows);
  }

  private deleteUser(userId: string): void {
    this.userService.delete(userId).subscribe({
      next: () => {
        console.log('User deleted successfully');
      },
      error: (err) => console.error('Delete failed', err)
    });
  }

  private deleteUsers(rows: any[]): void {
    const ids = rows.map((r) => r.id);
    // this.userService.deleteAll(ids).subscribe(() => {
    //   this.fetchUsers({ first: 0, rows: this.currentRows, search: '', status: null });
    // });
  }
}