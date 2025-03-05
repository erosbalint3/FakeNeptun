import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { UserSaveRequest } from '../../models/UserSaveRequest';
import { UserService } from '../../services/user.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  providers: [UserService, HttpClient]
})
export class RegisterPageComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      control.get('confirmPassword')?.setErrors(null);
    }
    
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user: UserSaveRequest = {
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        username: this.registerForm.get('username')?.value
      };
      this.userService.registerUser(user).subscribe((response: string) => {
        console.log(response);
      });
    }
  }
}
