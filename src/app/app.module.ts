import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRouting } from "./app.routing";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserModule } from "./pages/users/users.module";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRouting,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        UserModule,
        ToastModule
    ],
    providers: [
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }