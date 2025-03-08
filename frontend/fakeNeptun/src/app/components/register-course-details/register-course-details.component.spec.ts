import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCourseDetailsComponent } from './register-course-details.component';

describe('RegisterCourseDetailsComponent', () => {
  let component: RegisterCourseDetailsComponent;
  let fixture: ComponentFixture<RegisterCourseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCourseDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
