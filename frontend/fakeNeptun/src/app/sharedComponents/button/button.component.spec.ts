import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.label).toBe('');
    expect(component.color).toBe('');
  });

  it('should accept label input', () => {
    component.label = 'Test Button';
    fixture.detectChanges();
    expect(component.label).toBe('Test Button');
  });

  it('should accept color input', () => {
    component.color = 'primary';
    fixture.detectChanges();
    expect(component.color).toBe('primary');
  });

  it('should emit clicked event on click', () => {
    const mockEvent = new MouseEvent('click');
    spyOn(mockEvent, 'preventDefault');
    spyOn(component.clicked, 'emit');
    
    component.onClick(mockEvent);
    
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.clicked.emit).toHaveBeenCalledWith(mockEvent);
  });
});
