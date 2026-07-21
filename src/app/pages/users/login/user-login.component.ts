import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { LoginRequest } from '../../../dto/login/login.request';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Button } from "primeng/button";

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
    private fb: NonNullableFormBuilder
  ) { }

  onLogin() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const request: LoginRequest = this.loginForm.getRawValue();

    this.authService.login(request).subscribe({
      next: (res) => {
        localStorage.setItem('data', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => console.error(err)
    });
  }
}