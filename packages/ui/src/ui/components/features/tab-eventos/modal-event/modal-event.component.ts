import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalLayoutComponent } from '../../../layout/modal-layout/modal-layout.component';

@Component({
  selector: 'ui-modal-event',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalLayoutComponent],
  templateUrl: './modal-event.component.html',
  styleUrl: './modal-event.component.css'
})
export class ModalEventComponent  implements OnInit, OnDestroy, OnChanges {
  @Input() isOpen: boolean = false;
  @Input() mode: 'view' | 'create' | 'edit' = 'view';
  @Input() event: any | null = null;
  @Input() title: string = 'Detalle del Evento';
  
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

  editEvent: any | null = null;

  ngOnInit() {
    // Evitar scroll cuando el modal está abierto
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event'] || changes['mode']) {
      this.editEvent = this.event ? { ...this.event } : this.createEmptyEvent();
    }
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  // Método para cerrar el modal
  onClose() {
    this.close.emit();
  }

  // Método para guardar cambios
  onSave() {
    if (this.editEvent) {
      this.save.emit(this.editEvent);
    }
  }

  // Método para editar
  onEdit() {
    if (this.event) {
      this.edit.emit(this.event);
    }
  }

  private createEmptyEvent() {
    return {
      nombreEvento: '',
      tipoEvento: 'FESTIVAL_MULTIDISCIPLINARIO',
      categoria: 'CULTURAL_ARTISTICO',
      modalidad: 'PRESENCIAL',
      fechaApertura: '',
      fechaCierre: '',
      presupuestoTotal: 0,
      capacidadMaxima: 0,
      descripcion: '',
      estatus: 'EN_PREPARACION',
      etapaActual: 'PLANEACION'
    };
  }

  // Obtener clase CSS para el status
  getStatusClass(status: string): string {
    const statusMap: Record<string, string> = {
      'EN_PREPARACION': 'en-preparacion',
      'ACTIVO': 'activo',
      'FINALIZADO': 'finalizado',
      'PENDIENTE': 'pendiente'
    };
    return statusMap[status] || 'en-preparacion';
  }

  // Obtener ícono para el status
  getStatusIcon(status: string): string {
    const iconMap: Record<string, string> = {
      'EN_PREPARACION': 'fa-clock',
      'ACTIVO': 'fa-play',
      'FINALIZADO': 'fa-check-circle',
      'PENDIENTE': 'fa-hourglass-half'
    };
    return iconMap[status] || 'fa-clock';
  }

  // Formatear fecha
  formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Formatear moneda
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  }
}