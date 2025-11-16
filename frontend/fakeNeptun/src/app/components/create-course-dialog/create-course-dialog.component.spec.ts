import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { CreateCourseDialogComponent } from './create-course-dialog.component';

describe('CreateCourseDialogComponent', () => {
  let component: CreateCourseDialogComponent;
  let fixture: ComponentFixture<CreateCourseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCourseDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideMockStore({ initialState: {} })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    expect(component.form).toBeDefined();
    expect(component.form?.get('courseName')).toBeDefined();
    expect(component.form?.get('courseCredit')).toBeDefined();
  });

  it('should have form controls after init', () => {
    expect(component.form?.get('courseName')).toBeDefined();
    expect(component.form?.get('courseCredit')).toBeDefined();
    expect(component.form?.get('courseDescription')).toBeDefined();
    expect(component.form?.get('studentCountLimit')).toBeDefined();
  });
});
