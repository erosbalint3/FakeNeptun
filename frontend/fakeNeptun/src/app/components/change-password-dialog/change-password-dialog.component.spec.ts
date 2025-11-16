import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { ChangePasswordDialogComponent } from './change-password-dialog.component';

describe('ChangePasswordDialogComponent', () => {
  let component: ChangePasswordDialogComponent;
  let fixture: ComponentFixture<ChangePasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePasswordDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        provideMockStore({ initialState: {} })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have passwordForm defined', () => {
    expect(component.passwordForm).toBeDefined();
  });

  it('should have required form controls', () => {
    expect(component.passwordForm.get('currentPassword')).toBeDefined();
    expect(component.passwordForm.get('newPassword')).toBeDefined();
    expect(component.passwordForm.get('confirmPassword')).toBeDefined();
  });

  it('should close dialog on closeDialog', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    component['dialogRef'] = dialogRefSpy;
    component.closeDialog();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should dispatch action and close dialog on changePassword when form is valid', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    const mockSessionService = jasmine.createSpyObj('SessionManagementService', ['getSession', 'endSession']);
    mockSessionService.getSession.and.returnValue({ email: 'test@test.com' });
    
    component['dialogRef'] = dialogRefSpy;
    component['store'] = storeSpy;
    component['sessionService'] = mockSessionService;
    component.user = { email: 'test@test.com' } as any;
    
    component.passwordForm.patchValue({
      currentPassword: 'oldPass123',
      newPassword: 'newPass123',
      confirmPassword: 'newPass123'
    });
    
    component.changePassword();
    expect(storeSpy.dispatch).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should not dispatch action when form is invalid', () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    component['store'] = storeSpy;
    
    component.passwordForm.patchValue({
      currentPassword: '',
      newPassword: 'short',
      confirmPassword: 'short'
    });
    
    component.changePassword();
    expect(storeSpy.dispatch).not.toHaveBeenCalled();
  });
});
