import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [
    MatButton,
    NgClass
  ],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string | undefined = '';
  @Input() color: string | undefined = '';

  @Output() public clicked: EventEmitter<MouseEvent> = new EventEmitter();

  public onClick(event: MouseEvent): void {
    event.preventDefault();
    this.clicked.emit(event);
  }
}
