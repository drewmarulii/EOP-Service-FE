import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
    providedIn: 'root'
})
export class UserService {

    private api = 'http://localhost:8081/api/';

    constructor(
        private apiService: ApiService
    ) { }

    create(body: any) {
        return this.apiService.post(this.api + 'users', body);
    }

    edit(body: any) {
        return this.apiService.put(this.api + 'users', body);
    }

    getById(id: string) {
        return this.apiService.get(this.api + 'users' + `/${id}`);
    }

    getList(page: number, limit: number, body?: any) {
        return this.apiService.getList(this.api + 'users' + page, limit, body);
    }

    delete(id: string) {
        return this.apiService.delete(this.api + 'users' + `/${id}`);
    }
}
