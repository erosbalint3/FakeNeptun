import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { CourseDetailsModel } from '../../models/course-details.model';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {NgClass, NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import { MatButton } from '@angular/material/button';
import { ButtonComponent } from '../../sharedComponents/button/button.component';
import { Store } from '@ngrx/store';
import { CourseActions } from '../../store/actions/courses.actions';
import { SessionManagementService } from '../../services/session-management.service';
import {UserModel} from "../../models/user.model";
import {UserRole} from "../../enums/user-role.enum";

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
    NgForOf,
    ButtonComponent,
    NgClass,
    NgIf
  ],
  standalone: true,
  templateUrl: './register-course-details.component.html',
  styleUrl: './register-course-details.component.scss'
})
export class RegisterCourseDetailsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RegisterCourseDetailsComponent>,
    private store: Store,
    private sessionService: SessionManagementService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public details: CourseDetailsModel
  ) {}

  user: UserModel = this.sessionService.getSession();
  disabled: boolean = false;

  ngOnInit(): void {
    this.disabled = this.user.role !== UserRole.STUDENT;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRegister(): void {
    const user = this.sessionService.getSession();
    this.store.dispatch(CourseActions.courseRegister({ courseCode: this.details.details.courseCode, userEmail: user.email }));
    this.dialogRef.close();
  }

  onApprove(): void {
    this.store.dispatch(CourseActions.courseApprove({ courseCode: this.details.details.courseCode }));
    this.dialogRef.close();
  }

  onReject(): void {
    this.store.dispatch(CourseActions.courseDelete({ courseCode: this.details.details.courseCode }));
    this.dialogRef.close();
  }

  protected readonly Object = Object;
  protected readonly UserRole = UserRole;
}
