import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { TableComponentModule } from './table/table.module';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        InputTextModule,
        MenubarModule,
        ButtonModule,
        CardModule,
        PasswordModule,
        DropdownModule, 
        DividerModule,
        TableComponentModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        MenubarModule,
        ButtonModule,
        CardModule,
        PasswordModule,
        DropdownModule,
        DividerModule,
        TableComponentModule
    ],
})
export class SharedModule {}
