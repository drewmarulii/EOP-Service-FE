import { TableModule } from 'primeng/table';
import { TableComponent } from './table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    declarations: [
        TableComponent
    ],
    imports: [
        CommonModule,
        ButtonModule,
        TableModule,
        MenuModule,
        OverlayPanelModule,
        DropdownModule,
        FormsModule,
        PaginatorModule
    ],
    exports: [
        TableComponent
    ]
})
export class TableComponentModule {

}