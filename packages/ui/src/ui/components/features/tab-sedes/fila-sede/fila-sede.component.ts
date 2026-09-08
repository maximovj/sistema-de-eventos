import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sede, SedeEstado } from '@repo/shared-types';

@Component({
  selector: 'ui-fila-sede',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fila-sede.component.html',
  styleUrl: './fila-sede.component.css'
})
export class FilaSedeComponent {
  @Input({required: true}) sede!: Sede;

  @Output() ver = new EventEmitter<Sede>();
  @Output() editar = new EventEmitter<Sede>();
  @Output() eliminar = new EventEmitter<Sede>();

  obtenerIcono(estado: SedeEstado){
    switch(estado) {
      case SedeEstado.DISPONIBLE: return 'fa fa-check-circle'; break;
      case SedeEstado.OCUPADA: return 'fa fa-clock'; break;
      case SedeEstado.MANTENIMIENTO: return 'fa fa-tools'; break;
    }
  };

}
