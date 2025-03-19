import {Component, Inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ButtonComponent} from "../../sharedComponents/button/button.component";
import {Store} from "@ngrx/store";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {courseUsers$} from "../../store/selectors/course.selectors";
import {UserSelectionModel} from "../../models/user.model";
import {CourseActions} from "../../store/actions/courses.actions";

@Component({
  selector: 'app-participations-list',
  imports: [
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCheckbox,
    FormsModule,
    MatCellDef,
    MatCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    DatePipe,
    ButtonComponent
  ],
  templateUrl: './participations-list.component.html',
  styleUrl: './participations-list.component.scss'
})
export class ParticipationsListComponent implements OnInit {

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public details: {
      courseCode: string;
      startDate: Date;
    }
  ) {
  }

  ngOnInit(): void {
    this.courseUsers$.subscribe((u) => {
      if (u !== undefined) {
        this.users = u.map((value) => ({
          ...value,
          selected: false
        }))
      }
    })
  }

  courseStartDate = new Date(2024, 2, 15); // Example: March 15, 2024
  courseEndDate = new Date(2024, 5, 30);  // Example: June 30, 2024
  users: UserSelectionModel[] = [];

  courseUsers$ = this.store.select(courseUsers$);

  displayedColumns: string[] = ['select', 'name'];

  allSelected: boolean = false;

  toggleAllSelection(event: any): void {
    this.allSelected = event.checked;
    this.users.forEach(user => user.selected = this.allSelected);
  }

  updateMasterCheckbox() {
    this.allSelected = this.users.every(user => user.selected);
  }

  saveParticipation() {
    const selectedUsers = this.users.filter(user => user.selected);

    const request = {
      courseStartDate: this.details.startDate,
      courseStudentEmails: selectedUsers.map((u) => u.email),
      courseCode: this.details.courseCode
    };

    this.store.dispatch(CourseActions.courseUsersSave({request: request}));
  }
}
