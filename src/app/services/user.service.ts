import { Injectable } from '@angular/core';
import { ApiService, PagingRequest } from './api.service';
export interface UserPersonResponse {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    status: string;
    [key: string]: any;
}

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

  editProfile(body: any) {
    return this.apiService.put('user-profiles', body);
  }

  getById(id: string) {
    return this.apiService.get('users' + `/${id}`);
  }

  getByIdProfile(id: string) {
    return this.apiService.get('user-profiles' + `/${id}`);
  }

  getList(paging: PagingRequest, inquiry?: string) {
    return this.apiService.getList<UserPersonResponse>('user-profiles', paging, inquiry)
  }

  delete(id: string) {
    return this.apiService.delete('users' + `/${id}`);
  }

  deleteAll(id: any[]) {

  }
}
