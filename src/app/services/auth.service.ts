import { Injectable } from "@angular/core";
import { LoginRequest } from "../dto/login/login.request";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor (
        private apiService : ApiService
    ) {}

    login(request : LoginRequest) {
        return this.apiService.postLogin('auth/login', request);
    }

    getToken() : string | null {
        return localStorage.getItem('accessToken');
    }

    getUid() : string | null {
        return localStorage.getItem('uid');
    }

    getRole() : string | null { 
        return localStorage.getItem('role');
    }

    isLoggedIn() : boolean {
        return this.getToken != null;
    }
}