import { Component, OnInit, inject } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ColumnType } from '../../enums/column-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { CoursesActionsDialogComponent } from '../courses-actions-dialog/courses-actions-dialog.component';
import { CourseDetailsModel } from '../../models/course-details.model';
import { CompletionStatus } from '../../enums/completion-status.enum';
import { CreateCourseDialogComponent } from '../create-course-dialog/create-course-dialog.component';
import { RegisterForCourseDialogComponent } from '../register-for-course-dialog/register-for-course-dialog.component';
import { Store } from '@ngrx/store';
import { CourseModel } from '../../models/course.model';
import { CourseActions } from '../../store/actions/courses.actions';
import { courseList$ } from '../../store/selectors/course.selectors';
import { SessionManagementService } from '../../services/session-management.service';
import { UserModel } from '../../models/user.model';
import { UserRole } from '../../enums/user-role.enum';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatButton,
    NgForOf,
    NgIf,
    NgSwitch,
    NgSwitchCase,
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent implements OnInit {
  dialog = inject(MatDialog);
  private store = inject(Store);
  private sessionService = inject(SessionManagementService);


  courses: CourseModel[] = [];

  listCourses$ = this.store.select(courseList$);

  loggedInUser: UserModel | undefined;

  ngOnInit(): void {
    const user = this.sessionService.getSession();
    this.store.dispatch(CourseActions.coursesList({ studentEmail: user.email}));
    this.listCourses$.subscribe((courses) => {
      this.courses = courses;
    });
    this.loggedInUser = user;
  }

  protected readonly ColumnType = ColumnType;

  displayedColumns: string[] = ['courseName', 'courseCode', 'courseCredit', 'courseStudentCount', 'courseStudentCountLimit', 'courseTeacher', 'actions'];

  columns = [
    {
      name: 'courseName',
      title: 'Name',
      columnType: ColumnType.NORMAL
    },
    {
      name: 'courseCode',
      title: 'Code',
      columnType: ColumnType.NORMAL
    },
    {
      name: 'courseCredit',
      title: 'Credit',
      columnType: ColumnType.NORMAL
    },
    {
      name: 'courseStudentCount',
      title: 'Number of Students',
      columnType: ColumnType.NORMAL
    },
    {
      name: 'courseStudentCountLimit',
      title: 'Max number of Students',
      columnType: ColumnType.NORMAL
    },
    {
      name: 'courseTeacher',
      title: 'Teacher',
      columnType: ColumnType.NORMAL
    },
    {
      name: 'actions',
      columnType: ColumnType.ACTIONS
    }
  ];

  openDetailsDialog(element: any) {
    const courseDetails: CourseDetailsModel = {
      calendar: {
        missedClassesCount: element.missedClasses,
        presentClassesCount: element.courseCalendar.length - element.missedClasses,
        classDates: element.courseCalendar
      },
      details: {
        courseCode: element.courseCode,
        courseName: element.courseName,
        courseCredit: element.courseCredit,
        courseStudentCount: element.courseStudentCount,
        courseTeacher: element.courseTeacher,
        courseCompletionStatus: CompletionStatus.IN_PROGRESS,
        courseStudentCountLimit: element.courseStudentCountLimit
      }
    }

    this.dialog.open(CoursesActionsDialogComponent, {
      width: '1500px',
      data: courseDetails,
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '100ms'
    });
  }

  openNewCourseDialog(): void {
    this.dialog.open(CreateCourseDialogComponent, {
      width: '1500px',
      data: {},
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '100ms'
    });
  }

  openRegisterCourseDialog(): void {
    this.dialog.open(RegisterForCourseDialogComponent, {
      minWidth: '90vw',
      data: {},
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '100ms',
      panelClass: 'custom-dialog-container'
    });
  }

  protected readonly UserRole = UserRole;
}
