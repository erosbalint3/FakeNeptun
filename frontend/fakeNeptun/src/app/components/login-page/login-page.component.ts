import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginRequest } from '../../models/Requests/login.request';
import { Store } from '@ngrx/store';
import { UserActions } from '../../store/actions/user.actions';
import { Router } from '@angular/router';
import {SessionManagementService} from "../../services/session-management.service";

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private sessionService: SessionManagementService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user: LoginRequest = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };
      this.store.dispatch(UserActions.userLogin({ loginRequest: user }));
      if (this.sessionService.isAuthenticated()) {
        this.router.navigate(['/','home']);
      }
    }
  }
}
