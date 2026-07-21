import { NgModule } from "@angular/core";
import { NavBarComponent } from './navbar.component';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../shared-module';

@NgModule({
    declarations: [
        NavBarComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        SharedModule
    ],
    exports: [
        NavBarComponent
    ]
})
export class NavbarModule {

}