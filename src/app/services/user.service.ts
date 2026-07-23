import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private apiService: ApiService
    ) { }

    create(body: any) {
        return this.apiService.post('users', body);
    }

    edit(body: any) {
        return this.apiService.put('users', body);
    }

    getById(id: string) {
        return this.apiService.get('users' + `/${id}`);
    }

    getList(page: number, limit: number, body?: any) {
        return this.apiService.getList('users' + page, limit, body);
    }

    delete(id: string) {
        return this.apiService.delete('users' + `/${id}`);
    }
}
