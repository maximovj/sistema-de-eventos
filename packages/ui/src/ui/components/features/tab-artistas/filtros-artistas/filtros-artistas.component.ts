import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArtistaEstatusArtista, ArtistaGeneroMusical, ArtistaTipo } from '@repo/shared-types';

export interface FiltrosArtistas {
  busqueda: string;
  estatus: ArtistaEstatusArtista | '';
  tipoArtista: ArtistaTipo | '';
  generoMusical: ArtistaGeneroMusical | '';
}

@Component({
  selector: 'ui-filtros-artistas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtros-artistas.component.html',
  styleUrl: './filtros-artistas.component.css'
})
export class FiltrosArtistasComponent {
  @Input() resultados = 0;

  @Output() filtrosChange = new EventEmitter<FiltrosArtistas>();

  filtros: FiltrosArtistas = {
    busqueda: '',
    estatus: '',
    tipoArtista: '',
    generoMusical: '',
  };

  estatus = Object.values(ArtistaEstatusArtista);
  tiposArtista = Object.entries(ArtistaTipo);
  generosMusicales = Object.entries(ArtistaGeneroMusical);

  get filtrosActivos(): string[] {
    const filtrosActivos: string[] = [];

    if (this.filtros.busqueda.trim()) {
      filtrosActivos.push(`Búsqueda: ${this.filtros.busqueda.trim()}`);
    }
    if (this.filtros.estatus) {
      filtrosActivos.push(`Estatus: ${this.filtros.estatus}`);
    }
    if (this.filtros.tipoArtista) {
      const tipo = this.tiposArtista.find(([clave]) => clave === this.filtros.tipoArtista);
      filtrosActivos.push(`Tipo: ${tipo?.[1] ?? this.filtros.tipoArtista}`);
    }
    if (this.filtros.generoMusical) {
      const genero = this.generosMusicales.find(([clave]) => clave === this.filtros.generoMusical);
      filtrosActivos.push(`Género: ${genero?.[1] ?? this.filtros.generoMusical}`);
    }

    return filtrosActivos;
  }

  aplicarFiltros(): void {
    this.filtrosChange.emit({ ...this.filtros });
  }

  limpiarFiltros(): void {
    this.filtros = {
      busqueda: '',
      estatus: '',
      tipoArtista: '',
      generoMusical: '',
    };
    this.aplicarFiltros();
  }

}
