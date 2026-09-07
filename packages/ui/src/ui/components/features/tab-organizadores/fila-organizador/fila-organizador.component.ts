import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Organizador, TipoOrganizador } from '@repo/shared-types';

@Component({
  selector: 'ui-fila-organizador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fila-organizador.component.html',
  styleUrl: './fila-organizador.component.css'
})
export class FilaOrganizadorComponent {
  @Input({ required: true }) organizador!: Organizador;

  @Output() ver = new EventEmitter<Organizador>();
  @Output() editar = new EventEmitter<Organizador>();
  @Output() eliminar = new EventEmitter<Organizador>();

  obtenerIcono(tipo: TipoOrganizador): string {
    switch (tipo) {
      case TipoOrganizador.ASOCIACION_CIVIL:
        return 'fas fa-hand-holding-heart';
      case TipoOrganizador.EMPRESA_PUBLICA:
      case TipoOrganizador.EMPRESA_PRIVADA:
        return 'fas fa-building';
      case TipoOrganizador.PERSONA_FISICA:
        return 'fas fa-user-tie';
      default:
        return 'fas fa-building';
    }
  }

  obtenerBadgeTipo(tipo: TipoOrganizador): string {
    switch (tipo) {
      case TipoOrganizador.ASOCIACION_CIVIL:
        return 'badge-status asociacion';
      case TipoOrganizador.EMPRESA_PUBLICA:
      case TipoOrganizador.EMPRESA_PRIVADA:
        return 'badge-status empresa';
      case TipoOrganizador.PERSONA_FISICA:
        return 'badge-status persona';
      default:
        return 'badge-status empresa';
    }
  }
}