import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.errorMessage).toBeNull();
    expect(component.label).toBeNull();
    expect(component.isDisabled).toBe(false);
  });

  it('should write value', () => {
    component.writeValue('test value');
    expect(component.value).toBe('test value');
  });

  it('should register onChange callback', () => {
    const fn = jasmine.createSpy('onChange');
    component.registerOnChange(fn);
    component.onChange('test');
    expect(fn).toHaveBeenCalledWith('test');
  });

  it('should register onTouched callback', () => {
    const fn = jasmine.createSpy('onTouched');
    component.registerOnTouched(fn);
    component.onTouched();
    expect(fn).toHaveBeenCalled();
  });

  it('should handle value changes', () => {
    const fn = jasmine.createSpy('onChange');
    component.registerOnChange(fn);
    component.value = 'new value';
    component.onChange(component.value);
    expect(fn).toHaveBeenCalledWith('new value');
  });
});
