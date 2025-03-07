import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { InputComponent } from '../../sharedComponents/input/input.component';
import { InputType } from '../../enums/input-type.enum';

@Component({
  selector: 'app-edit-profile-dialog',
  imports: [
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel,
    InputComponent
  ],
  standalone: true,
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss'
})
export class EditProfileDialogComponent {
  editProfileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any }
  ) {
    this.editProfileForm = this.fb.group({
      name: [data.user.name, Validators.required],
      email: [data.user.email, [Validators.required, Validators.email]],
      phone: [data.user.phone, Validators.required],
    });
  }

  saveProfile() {
    if (this.editProfileForm.valid) {
      this.dialogRef.close(this.editProfileForm.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  protected readonly InputType = InputType;
}
