import { Component, OnInit } from '@angular/core';
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
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { CdkCell, CdkCellDef } from '@angular/cdk/table';
import { MatDialog } from '@angular/material/dialog';
import { CoursesActionsDialogComponent } from '../courses-actions-dialog/courses-actions-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { CourseDetailsModel } from '../../models/course-details.model';
import { CompletionStatus } from '../../enums/completion-status.enum';
import { CreateCourseDialogComponent } from '../create-course-dialog/create-course-dialog.component';
import { RegisterForCourseDialogComponent } from '../register-for-course-dialog/register-for-course-dialog.component';
import { Store } from '@ngrx/store';
import { CourseModel } from '../../models/course.model';
import { CourseActions } from '../../store/actions/courses.actions';
import { courseList$ } from '../../store/selectors/course.selectors';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatIcon,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatButton,
    NgForOf,
    NgIf,
    MatMenu,
    CdkCell,
    CdkCellDef,
    NgSwitch,
    NgSwitchCase,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent implements OnInit {

  courses: CourseModel[] = [];

  listCourses$ = this.store.select(courseList$);

  constructor(
    public dialog: MatDialog,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(CourseActions.coursesList());
    this.listCourses$.subscribe((courses) => {
      this.courses = courses;
    });
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
        missedClassesCount: 1,
        presentClassesCount: 2,
        classDates: [
          {
            startDate: new Date(2025, 3, 5, 14, 0),
            endDate: new Date(2025, 3, 5, 15, 30),
            length: 1.5,
            presence: true
          },
          {
            startDate: new Date(2025, 3, 6, 14, 0),
            endDate: new Date(2025, 3, 6, 15, 30),
            length: 1.5,
            presence: true
          },
          {
            startDate: new Date(2025, 3, 7, 14, 0),
            endDate: new Date(2025, 3, 7, 15, 30),
            length: 1.5,
            presence: false
          },
        ]
      },
      details: {
        courseCode: this.courses[0].courseCode,
        courseName: this.courses[0].courseName,
        courseCredit: this.courses[0].courseCredit,
        courseStudentCount: this.courses[0].courseStudentCount,
        courseTeacher: this.courses[0].courseTeacher,
        courseCompletionStatus: CompletionStatus.IN_PROGRESS,
        courseStudentCountLimit: this.courses[0].courseStudentCountLimit
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
}
