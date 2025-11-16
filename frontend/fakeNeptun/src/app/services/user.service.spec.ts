import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { SessionManagementService } from './session-management.service';
import { UserSaveRequest } from '../models/Requests/UserSaveRequest';
import { LoginRequest } from '../models/Requests/login.request';
import { UserModel } from '../models/user.model';
import { UserRole } from '../enums/user-role.enum';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let mockSessionService: jasmine.SpyObj<SessionManagementService>;

  beforeEach(() => {
    mockSessionService = jasmine.createSpyObj('SessionManagementService', ['setSession', 'endSession', 'getSession']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SessionManagementService, useValue: mockSessionService }
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register user', (done) => {
    const userRequest: UserSaveRequest = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser'
    };

    service.registerUser(userRequest).subscribe((response) => {
      expect(response).toBe('success');
      done();
    });

    const req = httpMock.expectOne('http://localhost:3000/api/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userRequest);
    req.flush('success');
  });

  it('should login user and set session', (done) => {
    const loginRequest: LoginRequest = {
      email: 'test@example.com',
      password: 'password123'
    };

    const mockUser: UserModel = {
      email: 'test@example.com',
      name: 'Test User',
      role: UserRole.STUDENT,
      username: 'testuser',
      telephone: '1234567890'
    };

    service.loginUser(loginRequest).subscribe();

    const requests = httpMock.match('http://localhost:3000/api/users/login');
    expect(requests.length).toBe(2); // Service makes 2 subscriptions
    for (const req of requests) {
      expect(req.request.method).toBe('POST');
      req.flush(mockUser);
    }
    
    setTimeout(() => {
      expect(mockSessionService.setSession).toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should change password', (done) => {
    const passwordRequest = {
      email: 'test@example.com',
      password: 'newpassword123'
    };

    service.changePassword(passwordRequest).subscribe(() => {
      done();
    });

    const req = httpMock.expectOne('http://localhost:3000/api/users/change-password');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(passwordRequest);
    req.flush(null);
  });

  it('should change profile data and update session', (done) => {
    const profileRequest = {
      email: 'test@example.com',
      newEmail: 'updated@example.com',
      name: 'Updated Name',
      telephone: '9876543210'
    };

    const mockUser: UserModel = {
      email: 'updated@example.com',
      name: 'Updated Name',
      role: UserRole.STUDENT,
      username: 'testuser',
      telephone: '9876543210'
    };

    service.changeProfileData(profileRequest).subscribe();

    const requests = httpMock.match('http://localhost:3000/api/users/change-profile-data');
    expect(requests.length).toBe(2); // Service makes 2 subscriptions
    for (const req of requests) {
      expect(req.request.method).toBe('PUT');
      req.flush(mockUser);
    }
    
    setTimeout(() => {
      expect(mockSessionService.endSession).toHaveBeenCalled();
      expect(mockSessionService.setSession).toHaveBeenCalled();
      done();
    }, 100);
  });
});
