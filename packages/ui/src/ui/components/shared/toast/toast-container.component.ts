import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastPosition, ToastService, ToastType } from '@repo/shared-services';

@Component({
  selector: 'ui-toast-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css'
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);
  readonly positions: ToastPosition[] = [
    'top-left',
    'top',
    'top-center',
    'top-right',
    'left',
    'center',
    'right',
    'bottom-left',
    'bottom',
    'bottom-center',
    'bottom-right',
  ];

  toastsAt(position: ToastPosition) {
    return this.toastService.toasts().filter(toast => toast.position === position);
  }

  iconFor(type: ToastType): string {
    switch (type) {
      case 'success': return 'fa-check-circle';
      case 'warning': return 'fa-exclamation-circle';
      case 'error': return 'fa-times-circle';
      default: return 'fa-info-circle';
    }
  }
}
