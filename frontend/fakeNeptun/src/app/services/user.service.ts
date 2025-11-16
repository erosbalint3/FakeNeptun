import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { UserSaveRequest } from "../models/Requests/UserSaveRequest";
import { Observable } from "rxjs";
import { LoginRequest } from '../models/Requests/login.request';
import { UserModel } from '../models/user.model';
import { SessionManagementService } from './session-management.service';
import {PasswordChangeRequestModel} from "../models/Requests/password-change-request.model";
import {ProfileDataChangeRequestModel} from "../models/Requests/profile-data-change-request.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly http = inject(HttpClient);
    private readonly sessionService = inject(SessionManagementService);


    registerUser(user: UserSaveRequest): Observable<string> {
        return this.http.post('http://localhost:3000/api/users', user, { responseType: 'text' });
    }

    loginUser(user: LoginRequest): Observable<UserModel> {
      const response = this.http.post<UserModel>('http://localhost:3000/api/users/login', user);

      response.subscribe((user) => {
        this.sessionService.setSession(user);
      });

      return response;
    }

    changePassword(passwordRequest: PasswordChangeRequestModel): Observable<void> {
      return this.http.put<void>('http://localhost:3000/api/users/change-password', passwordRequest);
    }

    changeProfileData(profileDataRequest: ProfileDataChangeRequestModel): Observable<UserModel> {
      const response = this.http.put<UserModel>('http://localhost:3000/api/users/change-profile-data', profileDataRequest);

      response.subscribe((user) => {
        this.sessionService.endSession();
        this.sessionService.setSession(user);
      });

      return response;
    }
}
