import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TabContentComponent } from "../../shared/components";
import { CommonModule } from '@angular/common';
import { ArtistasService } from '@repo/shared-services';
import { Artista } from '@repo/shared-types';
import { delay, finalize } from 'rxjs';
import { SpinnerComponent } from '@repo/ui';

@Component({
  selector: 'app-tab-artistas',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    TabContentComponent
  ],
  templateUrl: './tab-artistas.component.html',
  styleUrl: './tab-artistas.component.css'
})
export class TabArtistasComponent implements OnInit {
  private service = inject(ArtistasService);

  // Estados signals
  cargando = signal<boolean>(false);
  artistas = signal<Artista[]>([]);

  // Estados computadas
  total = computed(() => this.artistas().length || 0);
  
  ngOnInit(): void {
    this.cargarArtistas();
  }

  cargarArtistas() {
    this.cargando.set(true);
    this.service
    .artistas()
    .pipe(
      delay(1700),
      finalize(() => this.cargando.set(false))
    )
    .subscribe({
      next: (value) => {
        this.artistas.set(value);
      },
    });
  }


}
