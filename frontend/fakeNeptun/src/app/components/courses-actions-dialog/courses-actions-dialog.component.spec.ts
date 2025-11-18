import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { CoursesActionsDialogComponent } from './courses-actions-dialog.component';

describe('CoursesActionsDialogComponent', () => {
  let component: CoursesActionsDialogComponent;
  let fixture: ComponentFixture<CoursesActionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesActionsDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { missedClassesCount: 0, grades: [] } },
        provideMockStore({ initialState: {} })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesActionsDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have details injected', () => {
    expect(component.details).toBeDefined();
  });

  it('should close dialog on onNoClick', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    component.dialogRef = dialogRefSpy;
    component.onNoClick();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should dispatch onAbandon action', () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    const mockSessionService = jasmine.createSpyObj('SessionManagementService', ['getSession', 'endSession']);
    mockSessionService.getSession.and.returnValue({ email: 'test@test.com' });
    component['store'] = storeSpy;
    component['sessionService'] = mockSessionService;
    component.details = { details: { courseCode: 'CS101' } } as any;
    component.onAbandon();
    expect(storeSpy.dispatch).toHaveBeenCalled();
  });
});
