import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Artista, ArtistaEstatusArtista, ArtistaGeneroMusical, ArtistaTipo, ModalModo } from '@repo/shared-types';
import { ModalLayoutComponent } from '../../../layout/modal-layout/modal-layout.component';

type ArtistaBooleanField = {
  [K in keyof Artista]-?: Artista[K] extends boolean ? K : never
}[keyof Artista];

@Component({
  selector: 'ui-modal-artistas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalLayoutComponent,
  ],
  templateUrl: './modal-artistas.component.html',
  styleUrl: './modal-artistas.component.css'
})
export class ModalArtistasComponent implements OnInit, OnDestroy, OnChanges {
  // * Estados de entrada
  @Input() isOpen: boolean = false;
  @Input() mode: ModalModo = ModalModo.VER;
  @Input() artista: Artista | null = null;

  // * Estados de salida
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Artista>();
  @Output() edit = new EventEmitter<Artista>();
  @Output() delete = new EventEmitter<Artista>();
  @Output() yesDelete = new EventEmitter<Artista>();

  // * Estado literates
  modelo: string = 'Artista';
  modalModo = ModalModo;
  // * Estado signals
  editarArtista = signal<Artista>(this.artistaVacio());

  // * Método de Interfaces
  ngOnInit(): void {
    // Evitar scroll cuando el modal está abierto
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    const seAbrio = changes['isOpen']?.currentValue === true;
    const entroEnCrear = changes['mode']?.currentValue === 'create';

    if (this.mode === 'create' && (seAbrio || entroEnCrear)) {
      this.editarArtista.set(this.artistaVacio());
    } else if (changes['organizador'] || changes['mode']) {
      this.editarArtista.set(this.artista ? { ...this.artista } : this.artistaVacio());
    }
  }

  // * Funciones auxiliares

  private artistaVacio(): Artista {
    return {
      id: '',
      eventoId: '',
      nombre: '',
      nombreArtistico: '',
      tipoArtista: ArtistaTipo.OTRO,
      generoMusical: ArtistaGeneroMusical.OTRO,
      paisOrigen: '',
      ciudadOrigen: '',
      telefono: '',
      email: '',
      paginaWeb: '',
      instagram: '',
      spotify: '',
      cache: 0,
      costoTransporte: 0,
      costoHospedaje: 0,
      costoAlimentacion: 0,
      costoTotal: 0,
      fechaPresentacion: new Date().toISOString(), // ISO 8601: "2026-10-15T20:00"
      duracionPresentacion: 0, // minutos
      requiereTecnicos: 0,
      requiereInstrumentos: false,
      requiereBackline: false,
      checkIn: new Date().toISOString(),    // ISO 8601
      soundCheck: new Date().toISOString(), // ISO 8601
      estatus: ArtistaEstatusArtista.PENDIENTE,
    }
  }

  // Método para cerrar el modal
  onClose() {
    this.close.emit();
  }

  actualizarCampoCheckbox(campo: ArtistaBooleanField, event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const checked = !!target?.checked;

    this.editarArtista.update((artistaActual) => ({
      ...artistaActual,
      [campo]: checked,
    }));
  }

  // Método para guardar cambios
  onSave() {
    if (this.editarArtista()) {
      this.save.emit(this.editarArtista());
    }
  }

  // Método para editar
  onEdit() {
    if (this.artista) {
      this.edit.emit(this.artista);
    }
  }

  // Método para eliminar
  onDelete() {
    if (this.artista) {
      this.delete.emit(this.artista);
    }
  }

  onYesDelete() {
    if (this.artista) {
      this.yesDelete.emit(this.artista);
    }
  }

  public titulo() {
    switch(this.mode) {
      case ModalModo.CREAR: return `Nuevo ${this.modelo}`;
      case ModalModo.EDITAR: return `Editar ${this.modelo}`;
      case ModalModo.VER: return `Detalle del ${this.modelo}`;
      case ModalModo.ELIMINAR: return `Confirmar eliminación`;
      default: return `Modal de ${this.modelo}`;
    }
  }

  iconos() {
    return {
        view: 'fa-user-tag',
        create: 'fa-user-plus',
        edit: 'fa-edit',
        delete: 'fa-exclamation-triangle',
    };
  }

}
