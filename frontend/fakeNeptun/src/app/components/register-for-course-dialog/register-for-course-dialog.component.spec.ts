import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterForCourseDialogComponent } from './register-for-course-dialog.component';

describe('RegisterForCourseDialogComponent', () => {
  let component: RegisterForCourseDialogComponent;
  let fixture: ComponentFixture<RegisterForCourseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterForCourseDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterForCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
