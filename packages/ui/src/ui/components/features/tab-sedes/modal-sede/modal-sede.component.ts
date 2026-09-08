import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalLayoutComponent } from '../../../layout/modal-layout/modal-layout.component';
import { SedeEstado, Sede, ModalModo } from '@repo/shared-types';

type SedeBooleanField = {
  [K in keyof Sede]-?: Sede[K] extends boolean ? K : never
}[keyof Sede];

@Component({
  selector: 'ui-modal-sede',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalLayoutComponent,
  ],
  templateUrl: './modal-sede.component.html',
  styleUrl: './modal-sede.component.css'
})
export class ModalSedeComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isOpen: boolean = false;
  @Input() mode: ModalModo = ModalModo.VER;
  @Input() sede: Sede | null = null;
  @Input() title: string = 'Detalle del Sede';

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Sede>();
  @Output() edit = new EventEmitter<Sede>();
  @Output() delete = new EventEmitter<Sede>();
  @Output() yesDelete = new EventEmitter<Sede>();

  modalModo = ModalModo;
  editarSede = signal<Sede>(this.sedeVacio());

  ngOnInit() {
    // Evitar scroll cuando el modal está abierto
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const seAbrio = changes['isOpen']?.currentValue === true;
    const entroEnCrear = changes['mode']?.currentValue === 'create';

    if (this.mode === 'create' && (seAbrio || entroEnCrear)) {
      this.editarSede.set(this.sedeVacio());
    } else if (changes['organizador'] || changes['mode']) {
      this.editarSede.set(this.sede ? { ...this.sede } : this.sedeVacio());
    }
  }

  private sedeVacio(): Sede {
    return {
      id: '',
      eventoId: '',
      nombre: '',
      direccion: '',
      capacidad: 0,
      areaTotal: 0,
      areaCubierta: 0,
      areaDescubierta: 0,
      tieneEstacionamiento: false,
      capacidadEstacionamiento: 0,
      tieneAccesoDiscapacitados: false,
      tieneWifi: false,
      tieneAudio: false,
      tieneIluminacion: false,
      tieneProyectores: false,
      tieneCamaras: false,
      costoRenta: 0,
      fechaInicioOcupacion: new Date(),
      fechaFinOcupacion: new Date(),
      responsable: '',
      estado: SedeEstado.DISPONIBLE,
    }
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  // Método para cerrar el modal
  onClose() {
    this.close.emit();
  }

  actualizarCampoCheckbox(campo: SedeBooleanField, event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const checked = !!target?.checked;

    this.editarSede.update((sedeActual) => ({
      ...sedeActual,
      [campo]: checked,
    }));
  }

  // Método para guardar cambios
  onSave() {
    if (this.editarSede()) {
      this.save.emit(this.editarSede());
    }
  }

  // Método para editar
  onEdit() {
    if (this.sede) {
      this.edit.emit(this.sede);
    }
  }

  // Método para eliminar
  onDelete() {
    if (this.sede) {
      this.delete.emit(this.sede);
    }
  }

  onYesDelete() {
    if (this.sede) {
      this.yesDelete.emit(this.sede);
    }
  }

  public titulo() {
    switch(this.mode) {
      case ModalModo.CREAR: return 'Nuevo Sede';
      case ModalModo.EDITAR: return 'Editar Sede';
      case ModalModo.VER: return 'Detalle del Sede';
      case ModalModo.ELIMINAR: return 'Confirmar eliminación';
      default: return 'Modal de Sede';
    }
  }

  iconos() {
    return {
        view: 'fa-map-pin',
        create: 'fa-user-plus',
        edit: 'fa-edit',
        delete: 'fa-exclamation-triangle',
    };
  }
}
