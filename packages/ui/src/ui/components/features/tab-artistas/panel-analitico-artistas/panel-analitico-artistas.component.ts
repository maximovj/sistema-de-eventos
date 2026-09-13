import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Artista, ArtistaGeneroMusical, ArtistaTipo } from '@repo/shared-types';

@Component({
  selector: 'ui-panel-analitico-artistas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-analitico-artistas.component.html',
  styleUrl: './panel-analitico-artistas.component.css'
})
export class PanelAnaliticoArtistasComponent {
  // * Estados / Datos de entrada
  cargando = input<boolean>(false);
  artistas = input<Artista[]>([]);

  generos = Object.entries(ArtistaGeneroMusical);
  tipoArtistas = Object.entries(ArtistaTipo);

  top5Artistas = computed(() => {
    return [...this.artistas()]
      .sort((a, b) => b.costoTotal - a.costoTotal)
      .slice(0, 5);
  });

  contarPorGenero(genero: string) {
    if(this.artistas().length <= 0) return 0;
    console.log("this.artistas() => ",this.artistas());
    return this.artistas().filter(artista => artista.generoMusical === genero).length || 0;
  }

  contarPorTipoArtista(tipo: string) {
    if(this.artistas().length <= 0) return 0;
    return this.artistas().filter(artista => artista.tipoArtista === tipo).length || 0;
  }

  obtenerIniciales(name: string): string {
    if (!name) return '';
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join('');
  }

}
