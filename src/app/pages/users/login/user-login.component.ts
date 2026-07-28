import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class LoginComponent {
  loading!: boolean
  loginForm = this.fb.group({
    uid: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private toastService: ToastService
  ) { }

  onLogin() {
    if (this.loginForm.valid) {
      let obj = this.loginForm.getRawValue();

      lastValueFrom(this.authService.login(obj))
        .then((res) => {
          const jsonString = JSON.stringify(res);
          const response = JSON.parse(jsonString);
          this.toastService.addMessage('success', 'Success', 'Login Successful ' + response.uid);
          this.router.navigate(['/dashboard']);
        })
        .catch((error) => {
          this.toastService.addMessage('error', 'Login Failed', 'Invalid UID or password');
        });
    }
  }
}