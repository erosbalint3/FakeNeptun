import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { InputComponent } from '../../sharedComponents/input/input.component';
import { InputType } from '../../enums/input-type.enum';
import { ButtonComponent } from '../../sharedComponents/button/button.component';
import {ProfileDataChangeRequestModel} from "../../models/Requests/profile-data-change-request.model";
import {SessionManagementService} from "../../services/session-management.service";
import {Store} from "@ngrx/store";
import {UserActions} from "../../store/actions/user.actions";

@Component({
  selector: 'app-edit-profile-dialog',
  imports: [
    MatDialogTitle,
    ReactiveFormsModule,
    MatDialogActions,
    InputComponent,
    ButtonComponent
  ],
  standalone: true,
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss'
})
export class EditProfileDialogComponent {
  editProfileForm: FormGroup;

  user = this.sessionService.getSession();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProfileDialogComponent>,
    private store: Store,
    private sessionService: SessionManagementService,
    @Inject(MAT_DIALOG_DATA) public data: { user: any }
  ) {
    this.editProfileForm = this.fb.group({
      name: [data.user.name, Validators.required],
      email: [data.user.email, [Validators.required, Validators.email]],
      telephone: [data.user.phone, Validators.required],
    });
  }

  saveProfile() {
    if (this.editProfileForm.valid) {
      const request: ProfileDataChangeRequestModel = {
        email: this.user.email,
        newEmail: this.editProfileForm.get('email')?.value,
        telephone: this.editProfileForm.get('telephone')?.value,
        name: this.editProfileForm.get('name')?.value
      };
      this.store.dispatch(UserActions.userChangeProfileData({ changeProfileDataRequest: request }));
      this.dialogRef.close(request);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  protected readonly InputType = InputType;
}
