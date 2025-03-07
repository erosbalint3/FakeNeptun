import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { InputComponent } from '../../sharedComponents/input/input.component';
import { InputType } from '../../enums/input-type.enum';
import { MatIcon } from '@angular/material/icon';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-user-account',
  imports: [
    MatCard,
    MatToolbar,
    MatCardTitle,
    NgIf,
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    InputComponent,
    MatIcon,
    MatCardActions,
    MatIconButton,
    MatCardContent,
    MatCardSubtitle,
    MatCardHeader
  ],
  standalone: true,
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
  };

  editMode = false;

  constructor(private dialog: MatDialog) {}

  openChangePasswordDialog() {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px',
    });
  }

  openEditProfileDialog() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((updatedUser) => {
      if (updatedUser) {
        this.user = updatedUser; // Update user data after dialog is closed
      }
    });
  }

}
