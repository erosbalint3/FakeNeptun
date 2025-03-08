import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { CourseDetailsModel } from '../../models/course-details.model';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { NgForOf, NgTemplateOutlet } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ButtonComponent } from '../../sharedComponents/button/button.component';

@Component({
  selector: 'app-register-course-details',
  imports: [
    MatTabGroup,
    MatTab,
    MatDialogTitle,
    MatDialogContent,
    NgTemplateOutlet,
    MatDialogActions,
    MatButton,
    MatIcon,
    NgForOf,
    ButtonComponent
  ],
  standalone: true,
  templateUrl: './register-course-details.component.html',
  styleUrl: './register-course-details.component.scss'
})
export class RegisterCourseDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<RegisterCourseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public details: CourseDetailsModel
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  protected readonly Object = Object;
}
