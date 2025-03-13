import {Component, Inject, OnInit} from '@angular/core';
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
  MatTable,
} from '@angular/material/table';
import {MatCheckbox} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgSwitch, NgSwitchCase, NgTemplateOutlet} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogRef} from '@angular/material/dialog';
import {CourseDetailsModel} from '../../models/course-details.model';
import {CompletionStatus} from '../../enums/completion-status.enum';
import {RegisterCourseDetailsComponent} from '../register-course-details/register-course-details.component';
import {ButtonComponent} from '../../sharedComponents/button/button.component';
import {Store} from '@ngrx/store';
import {registerCourseList$} from '../../store/selectors/course.selectors';
import {CourseModel} from '../../models/course.model';
import {CourseActions} from '../../store/actions/courses.actions';
import {ColumnType} from '../../enums/column-type.enum';
import {SessionManagementService} from '../../services/session-management.service';
import {UserModel} from "../../models/user.model";
import {UserRole} from "../../enums/user-role.enum";
import {CourseStatus} from "../../enums/course-status.enum";

export interface User {
  id: number;
  name: string;
  email: string;
  selected?: boolean;
}

@Component({
  selector: 'app-register-for-course-dialog',
  imports: [
    MatCheckbox,
    MatHeaderCell,
    MatColumnDef,
    MatTable,
    MatCell,
    MatCellDef,
    FormsModule,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    NgTemplateOutlet,
    MatButton,
    MatDialogActions,
    ButtonComponent,
    NgForOf,
    NgSwitchCase,
    NgSwitch
  ],
  standalone: true,
  templateUrl: './register-for-course-dialog.component.html',
  styleUrl: './register-for-course-dialog.component.scss'
})
export class RegisterForCourseDialogComponent implements OnInit {
  courses$ = this.store.select(registerCourseList$);

  courseList: CourseModel[] = [];

  displayedColumns: string[] = [ 'select', 'courseName', 'courseCode', 'courseCredit', 'courseStudentCount', 'courseStudentCountLimit', 'courseTeacher', 'courseStatus', 'actions' ];
  selectedUsers: User[] = [];
  allSelected = false;

  user: UserModel = this.sessionService.getSession();

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
      name: 'courseStatus',
      title: 'Course status',
      columnType: ColumnType.NORMAL
    },
    {
      name: 'actions',
      columnType: ColumnType.ACTIONS
    }
  ];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RegisterForCourseDialogComponent>,
    private store: Store,
    private sessionService: SessionManagementService,
    @Inject(MAT_DIALOG_DATA) public details: {}
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CourseActions.courseRegisterList());
    this.courses$.subscribe((courses) => {
      if (this.user.role === UserRole.STUDENT) {
        this.courseList = courses.filter((course) => course.courseStatus === CourseStatus.AVAILABLE);
      } else {
        this.courseList = courses;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    const user = this.sessionService.getSession();
    this.store.dispatch(CourseActions.coursesList({studentEmail: user.email}));
  }

  openDetailsDialog(element: CourseModel) {
    const courseDetails: CourseDetailsModel = {
      calendar: {
        missedClassesCount: 1,
        presentClassesCount: 2,
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

    this.dialog.open(RegisterCourseDetailsComponent, {
      width: '1500px',
      data: courseDetails,
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '100ms'
    });
  }

  protected readonly ColumnType = ColumnType;
}
