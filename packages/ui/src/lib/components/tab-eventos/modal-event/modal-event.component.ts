import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-modal-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  // Copia local del evento para edición
  editEvent: any | null = {
    actualizadoPor:"Carlos Nava Flores",
    boletosVendidos:8760,
    capacidadMaxima:15000,
    categoria:"CULTURAL_ARTISTICO",
    creadoPor:"Sofía Marín Gutiérrez",
    descripcion:"Festival de 4 días con presentaciones musicales, exposiciones de arte, talleres interactivos y zona gastronómica. Participan 45 artistas nacionales e internacionales.",
    estatus:"EN_PREPARACION",
    etapaActual:"LOGISTICA_Y_MONTAJE",
    fechaActualizacion:"2026-08-21T09:15:00.000Z",
    fechaApertura:"2026-10-15T08:00:00.000Z",
    fechaCierre:"2026-10-19T06:00:00.000Z",
    fechaCreacion:"2026-04-15T14:30:00.000Z",
    fechaFin:"2026-10-18T23:59:00.000Z",
    fechaInicio:"2026-10-15T10:00:00.000Z",
    id:"234",
    modalidad:"PRESENCIAL",
    nombreEvento:"Festival Internacional de Música y Arte 2026",
    organizadorId:8923,
    porcentajeAvance:45.2,
    presupuestoEjercido:5640000.5,
    presupuestoTotal:12500000,
    tipoEvento:"FESTIVAL_MULTIDISCIPLINARIO",
  };

  ngOnInit() {
    // Evitar scroll cuando el modal está abierto
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.event) {
      this.editEvent = { ...this.event };
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