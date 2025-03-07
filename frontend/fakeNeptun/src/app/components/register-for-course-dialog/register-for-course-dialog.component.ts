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
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';

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
    MatDialogActions
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
}
