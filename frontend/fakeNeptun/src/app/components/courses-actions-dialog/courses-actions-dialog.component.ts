import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CourseDetailsModel } from '../../models/course-details.model';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-courses-actions-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatTabGroup,
    MatTab,
    NgTemplateOutlet,
    NgForOf,
    MatIcon,
    NgIf
  ],
  templateUrl: './courses-actions-dialog.component.html',
  standalone: true,
  styleUrl: './courses-actions-dialog.component.scss'
})
export class CoursesActionsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CoursesActionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public details: CourseDetailsModel
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  protected readonly Object = Object;
}
