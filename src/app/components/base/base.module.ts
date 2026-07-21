import { NgModule } from "@angular/core";
import { BaseComponent } from "./base.component";
import { NavbarModule } from "../nav-bar/navbar.module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        BaseComponent
    ],
    imports: [
        NavbarModule,
        RouterModule
    ],
    exports: [
        BaseComponent
    ]
})
export class BaseModule {

}