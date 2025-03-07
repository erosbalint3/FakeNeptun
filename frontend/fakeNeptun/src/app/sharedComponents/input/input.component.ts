import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { InputType } from '../../enums/input-type.enum';

@Component({
  selector: 'app-input',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() errorMessage: string | null = null;
  @Input() label: string | null = null;
  @Input() id: string | null = null;
  @Input() inputType: InputType = InputType.TEXT;
  @Input() isDisabled: boolean = false;
  value: any;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
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

  updateValue(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(input.value);
    this.onTouched();
  }
}
