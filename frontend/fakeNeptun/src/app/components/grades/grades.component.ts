import { Component, OnInit, inject } from '@angular/core';
import {UserModel} from "../../models/user.model";
import {SessionManagementService} from "../../services/session-management.service";
import {AsyncPipe, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {UserRole} from "../../enums/user-role.enum";
import {courseUsers$, registerCourseList$} from "../../store/selectors/course.selectors";
import {Store} from "@ngrx/store";
import {
  MatAccordion,
  MatExpansionPanel, MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {CourseModel} from "../../models/course.model";
import {CourseActions} from "../../store/actions/courses.actions";
import {Observable} from "rxjs";
import {ButtonComponent} from "../../sharedComponents/button/button.component";
import {GradesActions} from "../../store/actions/grades.actions";
import {finalGradeList$, gradeList$} from "../../store/selectors/grade.selectors";
import {GradePipe} from "../../pipes/grade.pipe";
import {FinalGrade} from "../../models/grade.model";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-grades',
  imports: [
    NgIf,
    NgTemplateOutlet,
    AsyncPipe,
    NgForOf,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelDescription,
    MatExpansionPanelTitle,
    ButtonComponent,
    GradePipe,
    MatMenu,
    MatMenuTrigger
  ],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.scss'
})
export class GradesComponent implements OnInit {
  private readonly sessionService = inject(SessionManagementService);
  private readonly store = inject(Store);


  user: UserModel = this.sessionService.getSession();
  selectedCourseUser?: UserModel;
  selectedCourse?: CourseModel;

  courses$: Observable<CourseModel[]> = this.store.select(registerCourseList$);
  courseUsers$: Observable<UserModel[] | undefined> = this.store.select(courseUsers$);
  studentCourses$: Observable<FinalGrade[]> = this.store.select(finalGradeList$);
  grades$: Observable<number[]> = this.store.select(gradeList$);

  ngOnInit(): void {
    this.store.dispatch(CourseActions.courseRegisterList());
    this.store.dispatch(CourseActions.coursesList({ studentEmail: this.user.email }));
    this.store.dispatch(GradesActions.gradesFinalGradeList({ studentEmail: this.user.email }));
  }

  protected readonly UserRole = UserRole;

  getCourseUsers(course: FinalGrade | CourseModel): void {
    this.store.dispatch(CourseActions.courseUsers({ courseCode: course.courseCode }));
    if(this.user.role === UserRole.STUDENT) {
      this.store.dispatch(GradesActions.gradesList({ studentEmail: this.user.email, courseCode: course.courseCode }));
    }
  }

  selectGrade(num: number) {
    if (this.selectedCourseUser === undefined || this.selectedCourse === undefined) {
      return;
    }
    this.store.dispatch(GradesActions.gradesCreate({
      grade: num,
      studentEmail: this.selectedCourseUser?.email,
      courseCode: this.selectedCourse?.courseCode
    }));
  }

  selectFinalGrade(num: number) {
    if (this.selectedCourseUser === undefined || this.selectedCourse === undefined) {
      return;
    }
    this.store.dispatch(GradesActions.gradesFinalGradeCreate({
      grade: num,
      studentEmail: this.selectedCourseUser?.email,
      courseCode: this.selectedCourse?.courseCode
    }));
  }

  selectCourseAndUser(user: UserModel, course: CourseModel) {
    this.selectedCourseUser = user;
    this.selectedCourse = course;
  }
}
