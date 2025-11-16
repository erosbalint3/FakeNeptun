import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { SessionManagementService } from '../../services/session-management.service';
import { EditProfileDialogComponent } from './edit-profile-dialog.component';

describe('EditProfileDialogComponent', () => {
  let component: EditProfileDialogComponent;
  let fixture: ComponentFixture<EditProfileDialogComponent>;

  beforeEach(async () => {
    const mockSessionService = jasmine.createSpyObj('SessionManagementService', ['getSession']);
    mockSessionService.getSession.and.returnValue({
      email: 'test@example.com',
      name: 'Test User',
      role: 'student'
    } as any);

    await TestBed.configureTestingModule({
      imports: [EditProfileDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { user: { name: 'Test User', email: 'test@example.com', phone: '123456789' } } },
        { provide: SessionManagementService, useValue: mockSessionService },
        provideMockStore({ initialState: {} })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have editProfileForm defined', () => {
    expect(component.editProfileForm).toBeDefined();
  });

  it('should initialize form with user data', () => {
    expect(component.editProfileForm.get('name')).toBeDefined();
    expect(component.editProfileForm.get('email')).toBeDefined();
    expect(component.editProfileForm.get('telephone')).toBeDefined();
  });

  it('should close dialog on closeDialog', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    component['dialogRef'] = dialogRefSpy;
    component.closeDialog();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should dispatch action on saveProfile when form is valid', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    component['dialogRef'] = dialogRefSpy;
    component['store'] = storeSpy;
    
    component.editProfileForm.patchValue({
      name: 'Updated Name',
      email: 'updated@test.com',
      telephone: '1234567'
    });
    
    component.saveProfile();
    expect(storeSpy.dispatch).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
