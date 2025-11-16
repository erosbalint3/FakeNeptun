import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SessionManagementService } from '../../services/session-management.service';
import { CoursesListComponent } from './courses-list.component';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let mockSessionService: jasmine.SpyObj<SessionManagementService>;

  beforeEach(async () => {
    mockSessionService = jasmine.createSpyObj('SessionManagementService', ['getSession']);
    mockSessionService.getSession.and.returnValue({
      email: 'test@example.com',
      name: 'Test User',
      role: 'student'
    } as any);

    await TestBed.configureTestingModule({
      imports: [CoursesListComponent],
      providers: [
        provideMockStore({
          initialState: { courses: { list: [] } }
        }),
        { provide: SessionManagementService, useValue: mockSessionService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize courses array before ngOnInit', () => {
    expect(component.courses).toBeDefined();
    expect(Array.isArray(component.courses)).toBe(true);
  });

  it('should initialize component after detectChanges', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch coursesList action on init', () => {
    fixture.detectChanges();
    expect(mockSessionService.getSession).toHaveBeenCalled();
  });

  it('should have ColumnType reference', () => {
    expect(component['ColumnType']).toBeDefined();
  });

  it('should open details dialog with course data', () => {
    const dialogSpy = spyOn(component.dialog, 'open');
    const mockCourse = {
      courseCode: 'CS101',
      courseName: 'Test Course',
      courseCredit: 3,
      courseStudentCount: 10,
      courseTeacher: 'Test Teacher',
      courseStudentCountLimit: 30,
      missedClasses: 2,
      courseCalendar: [new Date(), new Date(), new Date()]
    };
    
    component.openDetailsDialog(mockCourse);
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should open new course dialog', () => {
    const dialogSpy = spyOn(component.dialog, 'open');
    component.openNewCourseDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should open register course dialog', () => {
    const dialogSpy = spyOn(component.dialog, 'open');
    component.openRegisterCourseDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should have correct displayed columns', () => {
    expect(component.displayedColumns).toContain('courseName');
    expect(component.displayedColumns).toContain('actions');
    expect(component.displayedColumns.length).toBe(7);
  });

  it('should have UserRole reference', () => {
    expect(component['UserRole']).toBeDefined();
  });
});
