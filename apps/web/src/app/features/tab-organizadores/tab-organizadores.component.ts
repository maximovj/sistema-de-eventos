import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabContentComponent } from '../../shared/components';
import { OrganizadoresService } from '@repo/shared-services';
import { SpinnerComponent } from '@repo/ui';
import { Organizador, TipoOrganizador, ThFiltro } from '@repo/shared-types';
import { StatGridComponent } from '@repo/ui';
import { delay } from 'rxjs';

@Component({
  selector: 'app-tab-organizadores',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    TabContentComponent,
    SpinnerComponent,
    StatGridComponent,
  ],
  templateUrl: './tab-organizadores.component.html',
  styleUrl: './tab-organizadores.component.css'
})
export class TabOrganizadoresComponent implements OnInit {
  private service = inject(OrganizadoresService);

  // Estados signals
  public organizadores = signal<Organizador[]>([]);
  public datosFiltrados = signal<Organizador[]>([]); // Renombrado para claridad
  public cargando = signal<boolean>(false);
  public paginaActual = signal<number>(1);
  public porPagina = signal<number>(10);
  public campoOrden = signal<string>('nombre');
  public ordenAsc = signal<boolean>(true);
  public thFiltro = signal<ThFiltro>({
    nombre: 'asc',
    tipo: null,
    contacto_nombre: null,
    telefono: null,
    antiguedad: null,
  });
  public filtroBusqueda = signal<string>('');
  public filtroTipo = signal<string>('');
  public filtroAntiguedad = signal<string>('');

  // Estados computados
  public organizadoresFiltro = computed(() => {
    // Aplicar filtros a los datos originales
    let resultado = this.organizadores();
    
    // Búsqueda
    if (this.filtroBusqueda()) {
      const busqueda = this.filtroBusqueda().toLowerCase();
      resultado = resultado.filter(org => {
        const searchable = `${org.nombre} ${org.rfc} ${org.contacto_nombre} ${org.email} ${org.telefono}`.toLowerCase();
        return searchable.includes(busqueda);
      });
    }
    
    // Tipo
    if (this.filtroTipo()) {
      resultado = resultado.filter(org => org.tipo === this.filtroTipo());
    }
    
    // Antigüedad
    if (this.filtroAntiguedad()) {
      const antiguedadMin = parseInt(this.filtroAntiguedad());
      resultado = resultado.filter(org => parseInt(org.antiguedad) >= antiguedadMin);
    }
    
    return resultado;
  });

  // Datos paginados
  public datosPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.porPagina();
    const fin = inicio + this.porPagina();
    return this.organizadoresFiltro().slice(inicio, fin);
  });

  // Estadísticas
  public total = computed(() => this.organizadores().length || 0);
  public totalFiltrado = computed(() => this.organizadoresFiltro().length || 0);
  public totalPaginas = computed(() => Math.ceil(this.totalFiltrado() / this.porPagina()));
  public mostradoTotal = computed(()=> Math.min(this.paginaActual() * this.porPagina(), this.totalFiltrado()));
  
  public paginas = computed(() => {
    const total = this.totalPaginas();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  public habilitarPaginacionAnterior = computed(() => this.paginaActual() === 1 || this.totalPaginas() === 0);
  public habilitarPaginacionSiguiente = computed(() => this.paginaActual() === this.totalPaginas() || this.totalPaginas() === 0);

  public totalEmpresas = computed(() => this.organizadores()
    .filter(item => item.tipo === TipoOrganizador.EMPRESA_PRIVADA ||
            item.tipo === TipoOrganizador.EMPRESA_PUBLICA).length || 0);
  public totalAsociaciones = computed(() => this.organizadores()
    .filter(item => item.tipo === TipoOrganizador.ASOCIACION_CIVIL).length || 0);
  public totalPersonasFisicas = computed(() => this.organizadores()
    .filter(item => item.tipo === TipoOrganizador.PERSONA_FISICA).length || 0);
  
  ngOnInit(): void {
    this.cargarOrganizadores();
  }

  cargarOrganizadores() {
    this.cargando.set(true);
    this.service.organizadores()
    .pipe(
      delay(1700)
    )
    .subscribe({
      next: (data: Organizador[]) => {
        this.organizadores.set(data);
        this.ordenarDatos();
        this.resetearPaginacion();
      },
      complete: () => {
        this.cargando.set(false);
      }
    });
  }

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
    const datosOrdenados = [...this.organizadores()].sort((a: Organizador, b: Organizador) => {
      let valA = a[campo as keyof Organizador] ?? '';
      let valB = b[campo as keyof Organizador] ?? '';
      
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      
      if (valA < valB) return this.ordenAsc() ? -1 : 1;
      if (valA > valB) return this.ordenAsc() ? 1 : -1;
      return 0;
    });
    
    this.organizadores.set(datosOrdenados);
    this.limpiarFiltro();
    this.thFiltro()[campo as keyof ThFiltro] = this.ordenAsc() ? 'asc' : 'desc';
  }

  aplicarFiltros() {
    // Los filtros se aplican automáticamente a través de computed
    // Solo necesitamos resetear la paginación al aplicar filtros
    this.resetearPaginacion();
  }

  limpiarFiltros() {
    this.filtroBusqueda.set('');
    this.filtroTipo.set('');
    this.filtroAntiguedad.set('');
    this.resetearPaginacion();
  }

  verOrganizador(organizador: Organizador) {
    window.alert(`${organizador.nombre}\nRFC: ${organizador.rfc}`);
  }

  editarOrganizador(organizador: Organizador) {
    window.alert(`Editar organizador: ${organizador.nombre}`);
  }

  eliminarOrganizador(organizador: Organizador) {
    if (window.confirm(`¿Eliminar organizador ${organizador.nombre}?`)) {
      this.organizadores.update(items => items.filter(item => item.id !== organizador.id));
      this.resetearPaginacion();
    }
  }

  obtenerIcono(tipo: TipoOrganizador) {
    switch(tipo){
      case TipoOrganizador.ASOCIACION_CIVIL: return 'fas fa-hand-holding-heart';
      case TipoOrganizador.EMPRESA_PUBLICA:
      case TipoOrganizador.EMPRESA_PRIVADA: return 'fas fa-building';
      case TipoOrganizador.PERSONA_FISICA: return 'fas fa-user-tie';
      default: return 'fas fa-building';
    }
  }

  obtenerBadgeTipo(tipo: TipoOrganizador) {
    switch(tipo){
      case TipoOrganizador.ASOCIACION_CIVIL: return 'badge-status asociacion';
      case TipoOrganizador.EMPRESA_PUBLICA:
      case TipoOrganizador.EMPRESA_PRIVADA: return 'badge-status empresa';
      case TipoOrganizador.PERSONA_FISICA: return 'badge-status persona';
      default: return 'badge-status empresa';
    }
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

  private resetearPaginacion() {
    this.paginaActual.set(1);
  }

  private limpiarFiltro() {
    this.thFiltro.update(() => ({
      nombre: null,
      tipo: null,
      contacto_nombre: null,
      telefono: null,
      antiguedad: null,
    }));
  }

}