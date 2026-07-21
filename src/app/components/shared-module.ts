import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';

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
        TableModule
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
        TableModule
    ],
})
export class SharedModule {}
