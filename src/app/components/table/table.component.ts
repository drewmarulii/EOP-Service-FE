import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

export interface TableColumn {
  key: string;
  label: string;
  type?: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  dateFormat?: string;
  currency?: string;
  getValue?: (row: any) => any;
  activeValues?: string[];
}

export interface RowAction {
  action: string;
  label: string;
  icon: string;
  visible?: (row: any) => boolean;
}

export interface StatusOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {

  @Input() title = '';
  @Input() showAdd = true;
  @Input() showDelete = true;
  @Input() addLabel = 'Add';
  @Input() showSearch = true;
  @Input() searchPlaceholder = 'Search';
  @Input() statusOptions: StatusOption[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;
  @Input() selectable = true;
  @Input() showActions = true;
  @Input() rowActions: RowAction[] = [
    { action: 'detail', label: 'Detail', icon: 'pi pi-eye' },
    { action: 'edit', label: 'Edit', icon: 'pi pi-pencil' },
    { action: 'delete', label: 'Delete', icon: 'pi pi-trash' },
  ];
  @Input() dataKey = 'id';
  @Input() emptyMessage = 'No records found';
  @Input() lazy = true;
  @Input() totalRecords = 0;
  @Input() rows = 10;
  @Input() first = 0;
  @Input() rowsPerPageOptions: number[] = [10, 25, 50, 100];
  @Output() add = new EventEmitter<void>();
  @Output() deleteSelected = new EventEmitter<any[]>();
  @Output() search = new EventEmitter<string>();
  @Output() statusFilterChange = new EventEmitter<any>();
  @Output() action = new EventEmitter<{ action: string; row: any; index: number }>();
  @Output() rowSelect = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<{ first: number; rows: number }>();
  @Output() lazyLoad = new EventEmitter<{
    first: number;
    rows: number;
    search: string;
    status: any;
  }>();

  selection: any[] = [];
  searchValue = '';
  selectedStatus: any = null;
  selectedRow: any = null;
  selectedRowIndex: number = -1;
  menuItems: MenuItem[] = [];
  @ViewChild('rowMenu') rowMenu!: Menu;

  private searchDebounce: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.selection = [];
    }
  }

  get lastRecordIndex(): number {
    if (!this.totalRecords) return 0;
    return Math.min(this.first + this.rows, this.totalRecords);
  }

  onAddClick(): void {
    this.add.emit();
  }

  onDeleteClick(): void {
    if (this.selection.length) {
      this.deleteSelected.emit(this.selection);
    }
  }

  onSelectionChange(selection: any[]): void {
    this.selection = selection;
  }

  onSearchChange(): void {
    clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => {
      this.first = 0;
      this.search.emit(this.searchValue);
      this.emitLazyLoad();
    }, 300);
  }

  onStatusChange(value: any): void {
    this.selectedStatus = value;
    this.first = 0;
    this.statusFilterChange.emit(value);
    this.emitLazyLoad();
  }

  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? this.rows;
    this.pageChange.emit({ first: this.first, rows: this.rows });
    this.emitLazyLoad();
  }

  onRowsChange(rows: number): void {
    this.rows = rows;
    this.first = 0;
    this.emitLazyLoad();
  }

  emitLazyLoad(): void {
    this.lazyLoad.emit({
      first: this.first,
      rows: this.rows,
      search: this.searchValue,
      status: this.selectedStatus,
    });
  }

  openRowMenu(event: Event, row: any, rowIndex: number): void {
    this.selectedRow = row;

    this.menuItems = this.rowActions
      .filter(opt => this.isRowActionVisible(opt, row))
      .map(opt => ({
        label: opt.label,
        icon: opt.icon,
        command: () => {
          this.action.emit({ action: opt.action, row: row, index: rowIndex });
        }
      }));
    this.rowMenu.toggle(event);
  }

  isRowActionVisible(opt: RowAction, row: any): boolean {
    return opt.visible ? opt.visible(row) : true;
  }

  getCellValue(row: any, key: string): any {
    return key.split('.').reduce((value, part) => value?.[part], row);
  }
}