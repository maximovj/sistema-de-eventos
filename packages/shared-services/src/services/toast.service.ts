import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'info' | 'warning' | 'error';
export type ToastPosition =
  | 'top-left'
  | 'top'
  | 'top-center'
  | 'top-right'
  | 'left'
  | 'center'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastOptions {
  title: string;
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
}

export interface Toast extends Required<ToastOptions> {
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly nextId = signal(0);
  private readonly toastList = signal<Toast[]>([]);

  readonly toasts = this.toastList.asReadonly();

  show(options: ToastOptions): number {
    const id = this.nextId() + 1;
    const toast: Toast = {
      id,
      title: options.title,
      message: options.message,
      type: options.type ?? 'info',
      duration: options.duration ?? 4000,
      position: options.position ?? 'bottom-center',
    };

    this.nextId.set(id);
    this.toastList.update(toasts => [...toasts, toast]);

    if (toast.duration > 0) {
      window.setTimeout(() => this.dismiss(id), toast.duration);
    }

    return id;
  }

  success(title: string, message: string, duration?: number, position?: ToastPosition): number {
    return this.show({ title, message, type: 'success', duration, position });
  }

  info(title: string, message: string, duration?: number, position?: ToastPosition): number {
    return this.show({ title, message, type: 'info', duration, position });
  }

  warning(title: string, message: string, duration?: number, position?: ToastPosition): number {
    return this.show({ title, message, type: 'warning', duration, position });
  }

  error(title: string, message: string, duration?: number, position?: ToastPosition): number {
    return this.show({ title, message, type: 'error', duration, position });
  }

  dismiss(id: number): void {
    this.toastList.update(toasts => toasts.filter(toast => toast.id !== id));
  }

  dismissAll(): void {
    this.toastList.set([]);
  }
}
