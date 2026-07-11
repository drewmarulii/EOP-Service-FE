import { Component } from "@angular/core";
import { LoginRequest } from "../../../dto/login/login.request";
import { AuthService } from "../../../services/auth.service";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html'
})
export class LoginComponent {

    constructor(
        private authService : AuthService
    ) {

    }
}