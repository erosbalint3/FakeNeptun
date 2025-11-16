import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionManagementService } from '../../services/session-management.service';
import { UserAccountComponent } from './user-account.component';

describe('UserAccountComponent', () => {
  let component: UserAccountComponent;
  let fixture: ComponentFixture<UserAccountComponent>;
  let mockSessionService: jasmine.SpyObj<SessionManagementService>;

  beforeEach(async () => {
    mockSessionService = jasmine.createSpyObj('SessionManagementService', ['getSession']);
    mockSessionService.getSession.and.returnValue({
      email: 'test@example.com',
      name: 'Test User',
      role: 'student'
    } as any);

    await TestBed.configureTestingModule({
      imports: [UserAccountComponent],
      providers: [
        { provide: SessionManagementService, useValue: mockSessionService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user from session service', () => {
    expect(component.user).toBeDefined();
    expect(component.user.email).toBe('test@example.com');
    expect(component.user.name).toBe('Test User');
  });

  it('should open change password dialog', () => {
    const dialogSpy = spyOn(component['dialog'], 'open');
    component.openChangePasswordDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should open edit profile dialog with user data', () => {
    const dialogSpy = spyOn(component['dialog'], 'open').and.returnValue({
      afterClosed: () => ({ subscribe: (fn: any) => fn(null) })
    } as any);
    component.openEditProfileDialog();
    expect(dialogSpy).toHaveBeenCalledWith(jasmine.anything(), {
      width: '400px',
      data: { user: component.user }
    });
  });

  it('should update user data after dialog closes with updated data', () => {
    const updatedUser = { name: 'Updated User', email: 'updated@example.com' };
    spyOn(component['dialog'], 'open').and.returnValue({
      afterClosed: () => ({ subscribe: (fn: any) => fn(updatedUser) })
    } as any);
    
    component.openEditProfileDialog();
    
    expect(component.user.name).toBe('Updated User');
    expect(component.user.email).toBe('updated@example.com');
  });
});
