import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent {
  @Input() isOpen: boolean = false;
  @Input() message: string = '';

  @Output() confirmAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  onConfirm() {
    this.confirmAction.emit(true);
    this.closeModal();
  }

  onCancel() {
    this.confirmAction.emit(false);
    this.closeModal();
  }

  closeModal() {
    this.isOpen = false;
  }
}
