import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ArtistasService, ToastService } from '@repo/shared-services';
import { Artista, ModalModo } from '@repo/shared-types';
import { 
  ModalArtistasComponent,
  FiltrosArtistasComponent,
  GridTarjetasArtistasComponent,
  SpinnerComponent,
  StatsArtistasComponent,
  PanelAnaliticoArtistasComponent,
  PaginacionArtistasComponent,
  FiltrosArtistas,
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
  private toast = inject(ToastService);

  // Estados literales
  sedeSeleccionado: Artista | null = null;  
  modalAbierto: boolean = false;
  modalTipo: ModalModo = ModalModo.VER;

  // Estados signals
  cargando = signal<boolean>(false);
  artistas = signal<Artista[]>([]);
  filtros = signal<FiltrosArtistas>({
    busqueda: '',
    estatus: '',
    tipoArtista: '',
    generoMusical: '',
  });
  paginaActual = signal(1);
  porPagina = signal(12);

  // Estados computadas
  total = computed(() => this.artistas().length || 0);
  artistasFiltrados = computed(() => {
    const filtros = this.filtros();
    const busqueda = filtros.busqueda.trim().toLowerCase();

    return this.artistas().filter((artista) => {
      const coincideBusqueda = !busqueda || [
        artista.nombre,
        artista.nombreArtistico,
        artista.paisOrigen,
        artista.ciudadOrigen,
        artista.email,
      ].some((valor) => valor.toLowerCase().includes(busqueda));

      return coincideBusqueda
        && (!filtros.estatus || artista.estatus === filtros.estatus)
        && (!filtros.tipoArtista || artista.tipoArtista === filtros.tipoArtista)
        && (!filtros.generoMusical || artista.generoMusical === filtros.generoMusical);
    });
  });
  artistasPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.porPagina();
    return this.artistasFiltrados().slice(inicio, inicio + this.porPagina());
  });
  totalFiltrado = computed(() => this.artistasFiltrados().length);
  siguienteId = computed(() => {
    const ids = this.artistas()
      .map((artista) => Number(artista.id))
      .filter((id) => Number.isFinite(id));
    return String(ids.length ? Math.max(...ids) + 1 : 1);
  });
  
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
        this.paginaActual.set(1);
      },
    });
  }

  onFiltrosChange(filtros: FiltrosArtistas): void {
    this.filtros.set(filtros);
    this.paginaActual.set(1);
  }

  onPaginaChange(pagina: number): void {
    this.paginaActual.set(pagina);
  }

  onPorPaginaChange(porPagina: number): void {
    this.porPagina.set(porPagina);
    this.paginaActual.set(1);
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
    if (this.modalTipo === ModalModo.EDITAR) {
      this.service.actualizar(artista.id, artista).subscribe({
        next: (artistaActualizado) => {
          this.artistas.update((artistas) => artistas.map((item) =>
            item.id === artistaActualizado.id ? artistaActualizado : item
          ));
          this.toast.success('Artista actualizado', 'Los cambios se guardaron correctamente.');
          this.onCerrarModal();
        },
        error: () => this.toast.error('Error al actualizar', 'No fue posible guardar los cambios.'),
      });
      return;
    }

    const artistaNuevo = { ...artista, id: this.siguienteId() };
    this.service.guardar(artistaNuevo).subscribe({
      next: (artistaCreado) => {
        this.artistas.update((artistas) => [...artistas, artistaCreado]);
        this.paginaActual.set(1);
        this.toast.success('Artista creado', 'El artista se agregó correctamente.');
        this.onCerrarModal();
      },
      error: () => this.toast.error('Error al crear', 'No fue posible crear el artista.'),
    });
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
    this.service.eliminar(artista.id).subscribe({
      next: () => {
        this.artistas.update((artistas) => artistas.filter((item) => item.id !== artista.id));
        const totalPaginas = Math.ceil(this.totalFiltrado() / this.porPagina());
        this.paginaActual.update((pagina) => Math.min(pagina, Math.max(1, totalPaginas)));
        this.toast.success('Artista eliminado', `El artista #${artista.id} fue eliminado correctamente.`);
        this.onCerrarModal();
      },
      error: () => this.toast.error('Error al eliminar', 'No fue posible eliminar el artista.'),
    });
  }

  onCerrarModal() {
    this.modalAbierto = false; 
  }

}
