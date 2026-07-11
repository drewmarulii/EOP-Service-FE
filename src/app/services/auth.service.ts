import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../dto/login/login.request";
import { LoginResponse } from "../dto/login/login.response";
import { tap } from "rxjs";
import { response } from "express";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private api = 'http://localhost:8081/api/auth';

    constructor (
        private http : HttpClient
    ) {

    }

    login(request : LoginRequest) {
        return this.http.post<LoginResponse> (
            `${this.api}/login`, request
        ).pipe(
            tap(
                response => {
                    localStorage.setItem('accessToken', response.accessToken);
                    localStorage.setItem('uid', response.uid);
                    localStorage.setItem('role', response.role);
                }
            )
        )
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