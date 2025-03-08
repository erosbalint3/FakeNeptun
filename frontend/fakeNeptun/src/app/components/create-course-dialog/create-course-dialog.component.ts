import { Component, Inject, OnInit } from '@angular/core';
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
  constructor(
    public dialogRef: MatDialogRef<CreateCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public details: CourseDetailsModel
  ) {}

  form: FormGroup | undefined = undefined;

  ngOnInit(): void {
    this.form = new FormGroup({
      courseStartDate: new FormControl<Date | undefined>(undefined, [Validators.required]),
      courseEndDate: new FormControl<Date | undefined>(undefined, [Validators.required]),
      occurrenceFrequencyValue: new FormControl<number | undefined>(undefined, [Validators.required]),
      occurrenceFrequencyType: new FormControl<FrequencyType | undefined>(undefined, [Validators.required]),
      courseDescription: new FormControl<string | undefined>(undefined, [Validators.required]),
      courseCredit: new FormControl<number | undefined>(undefined, [Validators.required]),
      courseName: new FormControl<string | undefined>(undefined, [Validators.required]),
      requirements: new FormControl<File | string | undefined>(undefined, [Validators.required]),
      studentCountLimit: new FormControl<number | undefined>(undefined, [Validators.required])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  protected readonly InputType = InputType;
}
