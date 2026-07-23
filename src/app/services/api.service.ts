import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private api = 'http://localhost:8080/api/';

    protected header = new HttpHeaders();

    constructor(
        private httpClient: HttpClient
    ) { }

    getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        let headers = this.header.append(
            'Content-Type',
            'application/json'
        );

        if (token) {
            headers = headers.append(
                'Authorization',
                `Bearer ${token}`
            );
        }
        return headers;
    }

    postLogin(uri: string, body: object): Observable<any> {
        return this.httpClient
            .post<any>(this.api + uri, body, {
                observe: 'response',
            })
            .pipe(
                map((response) => {
                    const appResponse = this.mapToAppResponse(response);
                    localStorage.setItem('token', appResponse.accessToken);
                    localStorage.setItem('uid', appResponse.uid);
                    localStorage.setItem('role', appResponse.role);
                    return appResponse;
                }),
                catchError(this.handleError),
                finalize(() => { })
            );
    }

    post(uri: string, body: object, param?: HttpParams): Observable<any> {
        return this.httpClient
            .post<any>(this.api + uri, body, {
                headers: this.getHeaders(),
                observe: 'response',
                responseType: 'text' as 'json',
                params: param,
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => { })
            );
    }

    put(uri: string, body: object, param?: HttpParams): Observable<any> {
        return this.httpClient
            .put<any>(this.api + uri, body, {
                headers: this.getHeaders(),
                observe: 'response',
                responseType: 'text' as 'json',
                params: param,
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => { })
            );
    }

    get(uri: string, param?: HttpParams): Observable<any> {
        return this.httpClient
            .get<any>(this.api + uri, {
                headers: this.getHeaders(),
                observe: 'response',
                params: param,
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => { })
            );
    }

    delete(uri: string): Observable<any> {
        return this.httpClient
            .delete<any>(this.api + uri, {
                headers: this.getHeaders(),
                observe: 'response',
                responseType: 'text' as 'json',
            })
            .pipe(
                map((response) => this.mapToAppResponse(response)),
                catchError(this.handleError),
                finalize(() => { })
            );
    }

    getList(uri: string, page: number, limit: number, body?: any) {
        let param = this.getParam(page, limit, body);
        return this.get(this.api + uri, param);
    }

    getParam(page: number, limit: number, body?: any) {
        let param = new HttpParams()
            .set('page', page.toString())
            .set('pageSize', limit.toString());
        if (body) {
            Object.keys(body).forEach((k) => {
                if (body[k] == false || (body[k] && k !== 'isRefresh')) {
                    param = param.set(k, body[k]);
                }
            });
        }
        return param;
    }

    private mapToAppResponse(response: HttpResponse<any>): any {
        return response.body;
    }

    private handleError(err: HttpErrorResponse): Observable<any> {
        return throwError(() => err.error);
    }
}