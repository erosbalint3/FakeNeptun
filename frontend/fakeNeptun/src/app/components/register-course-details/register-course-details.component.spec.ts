import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { SessionManagementService } from '../../services/session-management.service';
import { RegisterCourseDetailsComponent } from './register-course-details.component';

describe('RegisterCourseDetailsComponent', () => {
  let component: RegisterCourseDetailsComponent;
  let fixture: ComponentFixture<RegisterCourseDetailsComponent>;
  let mockSessionService: jasmine.SpyObj<SessionManagementService>;

  beforeEach(async () => {
    mockSessionService = jasmine.createSpyObj('SessionManagementService', ['getSession']);
    mockSessionService.getSession.and.returnValue({
      email: 'test@example.com',
      name: 'Test User',
      role: 'student'
    } as any);

    await TestBed.configureTestingModule({
      imports: [RegisterCourseDetailsComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { classDates: [], requirements: [] } },
        provideMockStore({ initialState: {} }),
        { provide: SessionManagementService, useValue: mockSessionService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCourseDetailsComponent);
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

  it('should dispatch approve action on onApprove', () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    component['store'] = storeSpy;
    component.details = { details: { courseCode: 'CS101' } } as any;
    
    component.onApprove();
    expect(storeSpy.dispatch).toHaveBeenCalled();
  });

  it('should dispatch reject action on onReject', () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    component['store'] = storeSpy;
    component.details = { details: { courseCode: 'CS101' } } as any;
    
    component.onReject();
    expect(storeSpy.dispatch).toHaveBeenCalled();
  });

  it('should dispatch register action on onRegister', () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    const mockSessionService = jasmine.createSpyObj('SessionManagementService', ['getSession', 'endSession']);
    mockSessionService.getSession.and.returnValue({ email: 'test@test.com' });
    component['store'] = storeSpy;
    component['sessionService'] = mockSessionService;
    component.details = { details: { courseCode: 'CS101' } } as any;
    
    component.onRegister();
    expect(storeSpy.dispatch).toHaveBeenCalled();
  });
});
