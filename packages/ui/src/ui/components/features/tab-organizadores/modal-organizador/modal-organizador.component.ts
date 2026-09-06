import { Organizador, TipoOrganizador } from '@repo/shared-types';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalLayoutComponent } from '../../../layout/modal-layout/modal-layout.component';

@Component({
  selector: 'ui-modal-organizador',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalLayoutComponent],
  templateUrl: './modal-organizador.component.html',
  styleUrl: './modal-organizador.component.css'
})
export class ModalOrganizadorComponent   implements OnInit, OnDestroy, OnChanges {
  @Input() isOpen: boolean = false;
  @Input() mode: 'view' | 'create' | 'edit' | 'delete' = 'view';
  @Input() organizador: Organizador | null = null;
  @Input() title: string = 'Detalle del Organizador';
  
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Organizador>();
  @Output() edit = new EventEmitter<Organizador>();
  @Output() delete = new EventEmitter<Organizador>();
  @Output() yesDelete = new EventEmitter<Organizador>();

  editarOrganizador = signal<Organizador>(this.organizadorVacio());

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
      this.editarOrganizador.set(this.organizadorVacio());
    } else if (changes['organizador'] || changes['mode']) {
      this.editarOrganizador.set(this.organizador ? { ...this.organizador } : this.organizadorVacio());
    }
  }

  private organizadorVacio(): Organizador {
    return {
      id: '',
      tipo: 'EMPRESA_PRIVADA' as TipoOrganizador,
      nombre: '',
      rfc: '',
      telefono: '',
      email: '',
      direccion: '',
      antiguedad: '',
      contacto_nombre: '',
      contacto_cargo: '',
      contacto_telefono: '',
      contacto_celular: '',
    };
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
    if (this.editarOrganizador()) {
      this.save.emit(this.editarOrganizador());
    }
  }

  // Método para editar
  onEdit() {
    if (this.organizador) {
      this.edit.emit(this.organizador);
    }
  }

  // Método para eliminar
  onDelete() {
    if (this.organizador) {
      this.delete.emit(this.organizador);
    }
  }

  onYesDelete() {
    if (this.organizador) {
      this.yesDelete.emit(this.organizador);
    }
  }

  public titulo() {
    switch(this.mode) {
      case 'create': return 'Nuevo Organizador'; break;
      case 'edit': return 'Editar Organizador'; break;
      case 'view': return 'Detalle del Organizador'; break;
      case 'delete': return 'Confirmar eliminación'; break;
    }
  }

}