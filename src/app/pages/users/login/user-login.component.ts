import { Component } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './user-login.component.html'
})
export class LoginComponent {

    email = '';
    password = '';

    constructor(
        private authService: AuthService
    ) {

    }

    login() {
        console.log("Mencoba Login!");
    }
}