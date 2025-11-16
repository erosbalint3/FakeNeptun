import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownInputComponent } from './dropdown-input.component';

describe('DropdownInputComponent', () => {
  let component: DropdownInputComponent;
  let fixture: ComponentFixture<DropdownInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty options by default', () => {
    expect(component.options).toEqual([]);
  });

  it('should write value', () => {
    component.writeValue('testValue');
    expect(component.selectedValue).toBe('testValue');
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

  it('should select option and trigger callbacks', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    const onTouchedSpy = jasmine.createSpy('onTouched');
    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchedSpy);
    
    component.selectOption('newValue');
    
    expect(component.selectedValue).toBe('newValue');
    expect(onChangeSpy).toHaveBeenCalledWith('newValue');
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
