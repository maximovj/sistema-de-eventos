import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() evento: any | null = null;

  @Output() onEditarEvento = new EventEmitter<any>();
  @Output() onVerEvento = new EventEmitter<any>();
  @Output() onEliminarEvento = new EventEmitter<any>();

  editarEvento(evento: any) {
    this.onEditarEvento.emit(evento);
  }

  verEvento(evento: any) {
    this.onVerEvento.emit(evento);
  }

  eliminarEvento(evento: any) {
    this.onEliminarEvento.emit(evento);
  }

}

