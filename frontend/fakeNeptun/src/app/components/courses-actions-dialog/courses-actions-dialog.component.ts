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
import { ButtonComponent } from '../../sharedComponents/button/button.component';
import { Store } from '@ngrx/store';
import { SessionManagementService } from '../../services/session-management.service';
import { CourseActions } from '../../store/actions/courses.actions';

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
    NgIf,
    ButtonComponent
  ],
  templateUrl: './courses-actions-dialog.component.html',
  standalone: true,
  styleUrl: './courses-actions-dialog.component.scss'
})
export class CoursesActionsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CoursesActionsDialogComponent>,
    private store: Store,
    private sessionService: SessionManagementService,
    @Inject(MAT_DIALOG_DATA) public details: CourseDetailsModel
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAbandon() {
    const user = this.sessionService.getSession();
    this.store.dispatch(CourseActions.courseAbandon({ courseCode: this.details.details.courseCode, userEmail: user.email }));
    this.store.dispatch(CourseActions.coursesList({ studentEmail: user.email }));
    this.dialogRef.close();
  }

  protected readonly Object = Object;
}
