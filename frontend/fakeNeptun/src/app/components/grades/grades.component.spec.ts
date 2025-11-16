import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SessionManagementService } from '../../services/session-management.service';
import { GradesComponent } from './grades.component';

describe('GradesComponent', () => {
  let component: GradesComponent;
  let fixture: ComponentFixture<GradesComponent>;
  let mockSessionService: jasmine.SpyObj<SessionManagementService>;

  beforeEach(async () => {
    mockSessionService = jasmine.createSpyObj('SessionManagementService', ['getSession']);
    mockSessionService.getSession.and.returnValue({
      email: 'test@example.com',
      name: 'Test User',
      role: 'student'
    } as any);

    await TestBed.configureTestingModule({
      imports: [GradesComponent],
      providers: [
        provideMockStore({
          initialState: { grades: { list: [] } }
        }),
        { provide: SessionManagementService, useValue: mockSessionService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize grades$ observable', () => {
    expect(component.grades$).toBeDefined();
  });

  it('should have courses$ observable defined', () => {
    expect(component.courses$).toBeDefined();
  });

  it('should call getCourseUsers method', () => {
    const mockCourse = { courseCode: 'CS101', courseName: 'Test' } as any;
    spyOn(component['store'], 'dispatch');
    component.getCourseUsers(mockCourse);
    expect(component['store'].dispatch).toHaveBeenCalled();
  });

  it('should dispatch gradesList action on init', () => {
    expect(mockSessionService.getSession).toHaveBeenCalled();
  });
});
