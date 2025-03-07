import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown-input',
  imports: [],
  standalone: true,
  templateUrl: './dropdown-input.component.html',
  styleUrl: './dropdown-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownInputComponent),
      multi: true,
    },
  ],
})
export class DropdownInputComponent implements ControlValueAccessor {
  @Input() options: { label: string; value: any }[] = [];
  selectedValue: any;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle disable state if necessary
  }

  selectOption(value: any) {
    this.selectedValue = value;
    this.onChange(value);
    this.onTouched();
  }
}
