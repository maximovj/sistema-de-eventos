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
