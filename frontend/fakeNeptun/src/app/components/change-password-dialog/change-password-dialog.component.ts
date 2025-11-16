import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { InputComponent } from '../../sharedComponents/input/input.component';
import { InputType } from '../../enums/input-type.enum';
import { ButtonComponent } from '../../sharedComponents/button/button.component';
import {Store} from "@ngrx/store";
import {SessionManagementService} from "../../services/session-management.service";
import {UserActions} from "../../store/actions/user.actions";

@Component({
  selector: 'app-change-password-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogActions,
    InputComponent,
    ButtonComponent
  ],
  standalone: true,
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss'
})
export class ChangePasswordDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject<MatDialogRef<ChangePasswordDialogComponent>>(MatDialogRef);
  private store = inject(Store);
  private sessionService = inject(SessionManagementService);

  passwordForm: FormGroup;

  user = this.sessionService.getSession();

  constructor() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  changePassword() {
    if (this.passwordForm.valid) {
      const request = {
        email: this.user.email,
        password: this.passwordForm.get('newPassword')?.value
      };
      this.store.dispatch(UserActions.userChangePassword({ changePasswordRequest: request }));
      this.dialogRef.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  protected readonly InputType = InputType;
}
