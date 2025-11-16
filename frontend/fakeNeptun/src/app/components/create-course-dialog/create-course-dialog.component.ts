import { Component, OnInit, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { CourseDetailsModel } from '../../models/course-details.model';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatButton } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrequencyType } from '../../enums/frequency-type.enum';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { InputComponent } from '../../sharedComponents/input/input.component';
import { InputType } from '../../enums/input-type.enum';
import { ButtonComponent } from '../../sharedComponents/button/button.component';
import { CourseSaveModel } from '../../models/Requests/course-save-request.model';
import { Store } from '@ngrx/store';
import { CourseActions } from '../../store/actions/courses.actions';
import { loggedInUser$ } from '../../store/selectors/user.selectors';
import { SessionManagementService } from '../../services/session-management.service';

@Component({
  selector: 'app-create-course-dialog',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    ReactiveFormsModule,
    NgIf,
    InputComponent,
    NgTemplateOutlet,
    ButtonComponent
  ],
  templateUrl: './create-course-dialog.component.html',
  styleUrl: './create-course-dialog.component.scss'
})
export class CreateCourseDialogComponent implements OnInit {
  dialogRef = inject<MatDialogRef<CreateCourseDialogComponent>>(MatDialogRef);
  private readonly store = inject(Store);
  private readonly sessionService = inject(SessionManagementService);
  details = inject<CourseDetailsModel>(MAT_DIALOG_DATA);


  form: FormGroup | undefined = undefined;

  ngOnInit(): void {
    this.form = new FormGroup({
      courseStartDate: new FormControl<Date | undefined>(undefined, [Validators.required]),
      courseEndDate: new FormControl<Date | undefined>(undefined, [Validators.required]),
      occurrenceFrequencyValue: new FormControl<number | undefined>(undefined, [Validators.required]),
      occurrenceFrequencyType: new FormControl<FrequencyType | undefined>(undefined, [Validators.required]),
      courseLastDate: new FormControl<Date | undefined>(undefined, [Validators.required]),
      courseDescription: new FormControl<string | undefined>(undefined, [Validators.required]),
      courseCredit: new FormControl<number | undefined>(undefined, [Validators.required]),
      courseName: new FormControl<string | undefined>(undefined, [Validators.required]),
      requirements: new FormControl<File | string | undefined>(undefined, [Validators.required]),
      studentCountLimit: new FormControl<number | undefined>(undefined, [Validators.required])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    const user = this.sessionService.getSession();
    this.store.dispatch(CourseActions.coursesList({ studentEmail: user.email}));
  }

  onCreate(): void {
    const saveRequest: CourseSaveModel = {
      courseName: this.form?.get('courseName')?.value,
      courseCredit: this.form?.get('courseCredit')?.value,
      courseTeacher: 'testTeacher',
      courseDescription: this.form?.get('courseDescription')?.value,
      courseRequirements: this.form?.get('requirements')?.value,
      courseStudentCountLimit: this.form?.get('studentCountLimit')?.value,
      courseCalendar: {
        courseStartDate: this.form?.get('courseStartDate')?.value,
        courseEndDate: this.form?.get('courseEndDate')?.value,
        courseLastDate: this.form?.get('courseLastDate')?.value,
        courseOccurrenceFrequencyValue: this.form?.get('occurrenceFrequencyValue')?.value,
        courseOccurrenceFrequencyType: this.form?.get('occurrenceFrequencyType')?.value
      }
    };

    this.store.dispatch(CourseActions.courseSave({ courseSaveRequest: saveRequest }));
  }

  protected readonly InputType = InputType;
}
