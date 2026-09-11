import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ArtistasService } from '@repo/shared-services';
import { Artista, ModalModo } from '@repo/shared-types';
import { 
  ModalArtistasComponent,
  FiltrosArtistasComponent,
  GridTarjetasArtistasComponent,
  SpinnerComponent,
  StatsArtistasComponent,
  PanelAnaliticoArtistasComponent,
  PaginacionArtistasComponent,
} from '@repo/ui';
import { delay, finalize } from 'rxjs';
import { TabContentComponent } from "../../shared/components";

@Component({
  selector: 'app-tab-artistas',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    TabContentComponent,
    StatsArtistasComponent,
    FiltrosArtistasComponent,
    GridTarjetasArtistasComponent,
    PanelAnaliticoArtistasComponent,
    PaginacionArtistasComponent,
    ModalArtistasComponent
],
  templateUrl: './tab-artistas.component.html',
  styleUrl: './tab-artistas.component.css'
})
export class TabArtistasComponent implements OnInit {
  private service = inject(ArtistasService);

  // Estados literales
  sedeSeleccionado: Artista | null = null;  
  modalAbierto: boolean = false;
  modalTipo: ModalModo = ModalModo.VER;

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

  //////////////////////////////
  // * Operaciones CRUD
  /////////////////////////////

  crearArtista() {
    this.modalAbierto = true;
    this.modalTipo = ModalModo.CREAR;
  }

  verArtista(artista: Artista) {
    this.sedeSeleccionado = artista;
    this.modalAbierto = true;
    this.modalTipo = ModalModo.VER;
  }

  editarArtista(artista: Artista) {
    this.sedeSeleccionado = artista;
    this.modalAbierto = true;
    this.modalTipo = ModalModo.EDITAR;
  }

  eliminarArtista(artista: Artista) {
    this.sedeSeleccionado = artista;
    this.modalAbierto = true;
    this.modalTipo = ModalModo.ELIMINAR;
  }

  onGuardarArtista(artista: Artista) {
    if (this.modalTipo === 'edit') {
      
      return;
    }

    //this.service.guardar(sede);
  }

  onActualizarArtista(artista: Artista) {
    console.log("Actualizar sede: ", artista);
    this.editarArtista(artista);
  }
  
  onEliminarArtista(artista: Artista) {
    console.log("Eliminar sede: ", artista);
    this.eliminarArtista(artista);
  }
  
  onSiEliminarArtista(artista: Artista) {
    
  }

  onCerrarModal() {
    this.modalAbierto = false; 
  }

}
