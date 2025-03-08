import { Component, Inject } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { CourseDetailsModel } from '../../models/course-details.model';
import { CompletionStatus } from '../../enums/completion-status.enum';
import { RegisterCourseDetailsComponent } from '../register-course-details/register-course-details.component';
import { ButtonComponent } from '../../sharedComponents/button/button.component';

export interface User {
  id: number;
  name: string;
  email: string;
  selected?: boolean;
}

const USERS_DATA: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  { id: 4, name: 'Alice', email: 'alice@example.com' },
  { id: 5, name: 'Bob', email: 'bob@example.com' },
  { id: 6, name: 'Charlie', email: 'charlie@example.com' },
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

const courses = [
  {
    name: 'test',
    code: 'test',
    credit: 5,
    numberOfStudents: 30,
    maxNumberOfStudents: 50,
    teacher: 'tesztelek'
  },
  {
    name: 'test',
    code: 'test',
    credit: 5,
    numberOfStudents: 30,
    maxNumberOfStudents: 50,
    teacher: 'tesztelek'
  }
];

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
    ButtonComponent
  ],
  standalone: true,
  templateUrl: './register-for-course-dialog.component.html',
  styleUrl: './register-for-course-dialog.component.scss'
})
export class RegisterForCourseDialogComponent {
  displayedColumns: string[] = ['select', 'id', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>(USERS_DATA);
  selectedUsers: User[] = [];
  allSelected = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RegisterForCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public details: {}
  ) {}

  toggleAllSelection(isChecked: boolean) {
    this.dataSource.data.forEach(user => user.selected = isChecked);
    this.allSelected = isChecked;
    this.updateSelectedUsers();
  }

  isIndeterminate(): boolean {
    const selectedCount = this.dataSource.data.filter(user => user.selected).length;
    return selectedCount > 0 && selectedCount < this.dataSource.data.length;
  }

  toggleSelection(user: User, isChecked: boolean) {
    user.selected = isChecked;
    this.allSelected = this.dataSource.data.every(user => user.selected);
    this.updateSelectedUsers();
  }

  updateSelectedUsers() {
    this.selectedUsers = this.dataSource.data.filter(user => user.selected);
  }

  submit() {
    console.log('Selected Users:', this.selectedUsers);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

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
        courseCode: courses[0].code,
        courseName: courses[0].name,
        courseCredit: courses[0].credit,
        courseStudentCount: courses[0].numberOfStudents,
        courseTeacher: courses[0].teacher,
        courseCompletionStatus: CompletionStatus.IN_PROGRESS,
        courseStudentCountLimit: courses[0].maxNumberOfStudents
      }
    }

    this.dialog.open(RegisterCourseDetailsComponent, {
      width: '1500px',
      data: courseDetails,
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '100ms'
    });
  }
}
