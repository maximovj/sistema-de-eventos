import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TabContentComponent } from '../../shared/components';
import { SpinnerComponent, ModalSedeComponent, TableLayoutComponent, StatsSedesComponent, FilaSedeComponent } from '@repo/ui';
import { SedeService, ToastService } from '@repo/shared-services';
import { delay, finalize } from 'rxjs';
import { Sede, ModalModo, TipoFiltro } from '@repo/shared-types';

type SedeTh = Pick<Sede, 'nombre' | 'direccion' | 'responsable' | 'capacidad' | 'areaTotal' | 'costoRenta' | 'estado'>;
type ThFiltro = Record<keyof SedeTh, TipoFiltro>;

@Component({
  selector: 'app-tab-sedes',
  standalone: true,
  imports: [
    CommonModule,
    TabContentComponent,
    TableLayoutComponent,
    SpinnerComponent,
    ModalSedeComponent,
    StatsSedesComponent,
    FilaSedeComponent,
],
  templateUrl: './tab-sedes.component.html',
  styleUrl: './tab-sedes.component.css'
})
export class TabSedesComponent implements OnInit {
  ///////////////////////////////
  // * Inyección de depedencias
  ///////////////////////////////
  private service = inject(SedeService);
  private toast = inject(ToastService);

  // Estados literales
  sedeSeleccionado: Sede | null = null;  
  modalAbierto: boolean = false;
  modalTipo: ModalModo = ModalModo.VER;

  //////////////////////////////
  // * Estados signals
  //////////////////////////////

  public cargando = signal<boolean>(false);
  public sedes = signal<Sede[]>([]);
  public datosFiltrados = signal<Sede[]>([]);
  // paginación
  public paginaActual = signal<number>(1);
  public porPagina = signal<number>(10);
  public campoOrden = signal<string>('nombre');
  public ordenAsc = signal<boolean>(true);
  public thFiltro = signal<ThFiltro>(this.thVacio()); 

  /////////////////////////////
  // * Estados computadas
  /////////////////////////////

  public sedesFiltro = computed(() => {
    let resultado = this.sedes();
    return resultado;
  });

  // datos paginados
  public datosPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.porPagina();
    const fin = inicio + this.porPagina();
    return this.sedesFiltro().slice(inicio, fin);
  });

  // estadísticas
  public total = computed(() => this.sedes().length || 0);
  public totalFiltrado = computed(() => this.sedesFiltro().length || 0);
  public totalPaginas = computed(() => Math.ceil(this.totalFiltrado() / this.porPagina()));
  public mostradoTotal = computed(()=> Math.min(this.paginaActual() * this.porPagina(), this.totalFiltrado()));
  
  public paginas = computed(() => {
    const total = this.totalPaginas();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  public habilitarPaginacionAnterior = computed(() => this.paginaActual() === 1 || this.totalPaginas() === 0);
  public habilitarPaginacionSiguiente = computed(() => this.paginaActual() === this.totalPaginas() || this.totalPaginas() === 0);

  private siguienteId = computed(() => {
    const sedes = this.sedes();
    if (sedes.length === 0) return 1;
    
    // Encontrar el ID más alto
    const maxId = Math.max(...sedes.map(org => parseInt(org.id)));
    return maxId + 1;
  });
  
  ngOnInit(): void {
    this.cargarSedes();
  }

  cargarSedes() {
    this.cargando.set(true);
    this.service.sedes()
    .pipe(
      delay(1700),
      finalize(() => this.cargando.set(false)),
    )
    .subscribe({
      next: (sedes: Sede[]) => {
        this.sedes.set(sedes);
        this.ordenarDatos();
        this.resetearPaginacion();
      },
    });
  }

  /////////////////////////////////
  // * Filtro de Encabezados Th
  ////////////////////////////////

  ordenarPor(campo: string) {
    if (this.campoOrden() === campo) {
      this.ordenAsc.update(() => !this.ordenAsc());
    } else {
      this.campoOrden.set(campo);
      this.ordenAsc.update(() => true);
    }
    this.ordenarDatos();
    this.resetearPaginacion();
  }

  ordenarDatos() {
    const campo = this.campoOrden();
    const datosOrdenados = [...this.sedes()].sort((a: Sede, b: Sede) => {
      let valA = a[campo as keyof Sede] ?? '';
      let valB = b[campo as keyof Sede] ?? '';
      
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      
      if (valA < valB) return this.ordenAsc() ? -1 : 1;
      if (valA > valB) return this.ordenAsc() ? 1 : -1;
      return 0;
    });
    
    this.sedes.set(datosOrdenados);
    this.thFiltro.set(this.thVacio());
    this.thFiltro()[campo as keyof ThFiltro] = this.ordenAsc() ? 'asc' : 'desc';
  }

  thVacio(): ThFiltro {
    return {
      nombre: null,
      direccion: null,
      capacidad: null,
      areaTotal: null,
      costoRenta: null,
      responsable: null,
      estado: null,
    }  
  }

  ////////////////////////////////
  // * Filtro de Paginación
  ////////////////////////////////

  resetearPaginacion() {
    this.paginaActual.set(1);
  }

  cambiarPorPagina() {
    this.resetearPaginacion();
  }

  cambiarPagina(accion: string) {
    const total = this.totalPaginas();
    if (total === 0) return;
    
    switch(accion) {
      case 'primera':
        this.paginaActual.set(1);
        break;
      case 'anterior':
        this.paginaActual.set(Math.max(1, this.paginaActual() - 1));
        break;
      case 'siguiente':
        this.paginaActual.set(Math.min(total, this.paginaActual() + 1));
        break;
      case 'ultima':
        this.paginaActual.set(total);
        break;
    }
  }

  irPagina(pagina: number) {
    const total = this.totalPaginas();
    if (pagina >= 1 && pagina <= total) {
      this.paginaActual.set(pagina);
    }
  }

  onPageChange(value: number | Event) {
    if (typeof value === 'number') {
      this.irPagina(value);
    }
  }

  onPageSizeChange(value: number | Event) {
    const pageSize = typeof value === 'number'
      ? value
      : Number((value.target as HTMLSelectElement).value);
    this.porPagina.set(pageSize);
    this.cambiarPorPagina();
  }

  //////////////////////////////
  // * Operaciones CRUD
  /////////////////////////////

  crearSede() {
    this.modalAbierto = true;
    this.modalTipo = ModalModo.CREAR;
  }

  verSede(sede: Sede) {
    this.sedeSeleccionado = sede;
    this.modalAbierto = true;
    this.modalTipo = ModalModo.VER;
  }

  editarSede(sede: Sede) {
    this.sedeSeleccionado = sede;
    this.modalAbierto = true;
    this.modalTipo = ModalModo.EDITAR;
  }

  eliminarSede(sede: Sede) {
    this.sedeSeleccionado = sede;
    this.modalAbierto = true;
    this.modalTipo = ModalModo.ELIMINAR;
  }

  onGuardarSede(sede: Sede) {
    if (this.modalTipo === 'edit') {
      this.service.actualizar(sede.id, sede).subscribe({
        next: organizadorActualizado => {
          this.sedes.update(sedes => sedes.map(item =>
            item.id === organizadorActualizado.id ? organizadorActualizado : item
          ));
          this.ordenarDatos();
          this.toast.success('Organizador actualizado', 'Los cambios se guardaron correctamente.');
          this.onCerrarModal();
        },
        error: () => this.toast.error('Error al actualizar', 'No fue posible guardar los cambios.')
      });
      return;
    }

    sede = {...sede, id: this.siguienteId().toString()};
    this.service.guardar(sede).subscribe({
      next: organizadorCreado => {
        this.sedes.update(sedes => [...sedes, organizadorCreado]);
        this.ordenarDatos();
        this.resetearPaginacion();
        this.toast.success('Organizador agregado', 'El organizador se ha creado exitosamente.');
        this.onCerrarModal();
      },
      error: () => this.toast.error('Error al crear', 'No fue posible crear el organizador.')
    });
  }
  
  onActualizarSede(sede: Sede) {
    console.log("Actualizar sede: ", sede);
    this.editarSede(sede);
  }
  
  onEliminarSede(sede: Sede) {
    console.log("Eliminar sede: ", sede);
    this.eliminarSede(sede);
  }
  
  onSiEliminarSede(sede: Sede) {
    this.service.eliminar(sede.id).subscribe({
      next: () => {
        this.sedes.update(sedes =>
          sedes.filter(item => item.id !== sede.id)
        );
        this.paginaActual.set(Math.min(this.paginaActual(), Math.max(1, this.totalPaginas())));
        this.toast.success('Organizador eliminado', `El organizador #${sede.id} fue eliminado correctamente.`);
        this.onCerrarModal();
      },
      error: () => this.toast.error('Error al eliminar', 'No fue posible eliminar el organizador.')
    });
  }

  onCerrarModal() {
    this.modalAbierto = false; 
  }
  
}
