import { CommonModule } from '@angular/common';
import { Component, computed, input, OnChanges, SimpleChanges } from '@angular/core';
import { Artista, ArtistaEstatusArtista } from '@repo/shared-types';

@Component({
  selector: 'ui-stats-artistas',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './stats-artistas.component.html',
  styleUrl: './stats-artistas.component.css'
})
export class StatsArtistasComponent implements OnChanges {
  
  // * Estados / Datos de entrada
  cargando = input<boolean>(false);
  artistas = input<Artista[]>([]);

  totalArtistas = computed(() => this.artistas().length || 0);

  confirmados = computed(() => this.artistas().filter(item => item.estatus === ArtistaEstatusArtista.CONFIRMADO).length || 0);
  cancelados = computed(() => this.artistas().filter(item => item.estatus === ArtistaEstatusArtista.CANCELADO).length || 0);
  pendientes = computed(() => this.artistas().filter(item => item.estatus === ArtistaEstatusArtista.PENDIENTE).length || 0);
  costoTotal = computed(() => this.artistas().reduce((acc, item) => acc += item.costoTotal, 0));

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['artistas'] && this.artistas) {
      console.log(this.artistas());
    }
  }

}
