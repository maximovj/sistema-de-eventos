import { CommonModule } from '@angular/common';
import { Component, computed, Input, Output, EventEmitter } from '@angular/core';
import { Artista } from '@repo/shared-types';

@Component({
  selector: 'ui-grid-tarjetas-artistas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-tarjetas-artistas.component.html',
  styleUrl: './grid-tarjetas-artistas.component.css'
})
export class GridTarjetasArtistasComponent {
  // * Estados / Datos de entrada
  @Input() cargando!: boolean;
  @Input() artistas!: Artista[];

  // * Estados / Datos de salida
  @Output() ver: EventEmitter<Artista> = new EventEmitter<Artista>;
  @Output() editar: EventEmitter<Artista> = new EventEmitter<Artista>;
  @Output() eliminar: EventEmitter<Artista> = new EventEmitter<Artista>;

  // * Estados computadas
  totalArtistas = computed(() => this.artistas.length || 0); 
  sinArtistas = computed(() => this.artistas.length <= 0);

  // * Funciones auxiliares
  obtenerIniciales(name: string): string {
    if (!name) return '';
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join('');
  }

  obtenerG(nombreArtistico: string): number {
    const text = nombreArtistico.trim();
    return text ? text.split(/\s+/).length : 0;
  }

  verArtista(artista: Artista) {
    this.ver.emit(artista);
  }

  editarArtista(artista: Artista) {
    this.editar.emit(artista);
  }

  eliminarArtista(artista: Artista) {
    this.eliminar.emit(artista);
  }

}
