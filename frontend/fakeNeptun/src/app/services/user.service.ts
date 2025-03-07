import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserSaveRequest } from "../models/UserSaveRequest";
import { Observable } from "rxjs";
import { LoginRequest } from '../models/login.request';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private readonly http: HttpClient) {}

    registerUser(user: UserSaveRequest): Observable<string> {
        return this.http.post('http://localhost:3000/api/users', user, { responseType: 'text' });
    }

    loginUser(user: LoginRequest): Observable<string> {
      return this.http.post('http://localhost:3000/api/users/login', user, { responseType: 'text' });
    }
}
