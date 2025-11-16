import { Component, OnInit, inject } from '@angular/core';
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
import {ParticipationsListComponent} from "../participations-list/participations-list.component";

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
  dialogRef = inject<MatDialogRef<RegisterCourseDetailsComponent>>(MatDialogRef);
  private store = inject(Store);
  private sessionService = inject(SessionManagementService);
  private dialog = inject(MatDialog);
  details = inject<CourseDetailsModel>(MAT_DIALOG_DATA);


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


  openParticipationsDialog(element: any) {
    this.store.dispatch(CourseActions.courseUsers({ courseCode: this.details.details.courseCode}));
    this.dialog.open(ParticipationsListComponent, {
      width: '1500px',
      data: {
        courseCode: this.details.details.courseCode,
        startDate: element.startDate
      },
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '100ms'
    });
  }

  protected readonly UserRole = UserRole;
}
