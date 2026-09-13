import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ui-paginacion-artistas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paginacion-artistas.component.html',
  styleUrl: './paginacion-artistas.component.css'
})
export class PaginacionArtistasComponent {
  @Input() paginaActual = 1;
  @Input() totalItems = 0;
  @Input() porPagina = 12;
  @Input() opcionesPorPagina = [6, 12, 24, 48];

  @Output() paginaChange = new EventEmitter<number>();
  @Output() porPaginaChange = new EventEmitter<number>();

  get totalPaginas(): number {
    return Math.ceil(this.totalItems / this.porPagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, indice) => indice + 1);
  }

  get inicioMostrando(): number {
    return this.totalItems === 0 ? 0 : (this.paginaActual - 1) * this.porPagina + 1;
  }

  get finMostrando(): number {
    return Math.min(this.paginaActual * this.porPagina, this.totalItems);
  }

  irPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas && pagina !== this.paginaActual) {
      this.paginaChange.emit(pagina);
    }
  }

  cambiarPorPagina(): void {
    this.porPaginaChange.emit(this.porPagina);
  }

}
