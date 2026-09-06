import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ModalMode = 'view' | 'create' | 'edit' | 'delete';
type ModalIcons = Partial<Record<ModalMode, string>>;

@Component({
  selector: 'ui-modal-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-layout.component.html',
  styleUrl: './modal-layout.component.css'
})
export class ModalLayoutComponent implements OnChanges, OnDestroy {
  @Input() isOpen: boolean = false;
  @Input() mode: ModalMode = 'view';
  @Input() title: string = 'Detalle del Evento';
  @Input() icons: ModalIcons = {};
  /** @deprecated Use icons to configure one icon per mode. */
  @Input() icon: string = '';
  
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  onClose() {
    this.close.emit();
  }

  get headerIcon(): string {
    return this.icons[this.mode] || this.icon || {
      view: 'fa-eye',
      create: 'fa-plus-circle',
      edit: 'fa-edit',
      delete: 'fa-trash',
    }[this.mode];
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen) {
      this.onClose();
    }
  }
}
