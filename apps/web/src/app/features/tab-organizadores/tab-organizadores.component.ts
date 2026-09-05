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
  public _filtrado = signal<Organizador[]>([]);
  public cargando = signal<boolean>(false);
  public paginaActual = signal<number>(1);
  public pageSize = signal<number>(10);
  public campoOrden = signal<string>('nombre');
  public ordenAsc = signal<boolean>(true);
  public thFiltro = signal<ThFiltro>({
    nombre: 'asc',
    tipo: null,
    contacto_nombre: null,
    telefono: null,
    antiguedad: null,
  });
  public filtroBusqueda = signal<string|null>(null);
  public filtroTipo = signal<string|null>('');
  public filtroAntiguedad = signal<string>('');

  // Estados/Funciones computadas
  public organizadoresFiltro = computed(() => {
    const items = this._filtrado();
    if(items.length <= 0) return this.organizadores();
    else return items;
  });

  public total = computed(() => this.organizadores().length || 0);
  public totalFiltro = computed(() => this._filtrado().length || 0);
  public totalEmpresas = computed(() => this.organizadores()
    .filter(item => item.tipo == TipoOrganizador.EMPRESA_PRIVADA ||
            item.tipo == TipoOrganizador.EMPRESA_PUBLICA ).length || 0);
  public totalAsociaciones = computed(() => this.organizadores()
    .filter(item => item.tipo == TipoOrganizador.ASOCIACION_CIVIL).length || 0);
  public totalPersonasFisicas = computed(() => this.organizadores()
    .filter(item => item.tipo == TipoOrganizador.PERSONA_FISICA).length || 0);
  
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
      },
      complete: () => {
        this.cargando.set(false);
      }
    });
  }

  ordenarPor(campo:string) {
    if (this.campoOrden() === campo) {
      this.ordenAsc.update(() => !this.ordenAsc());
    } else {
      this.campoOrden.set(campo);
      this.ordenAsc.update(() => true);
    }
    this.ordenarDatos();
  }

  ordenarDatos() {
    const campo = this.campoOrden();
    this.organizadores().sort((a: Organizador, b: Organizador) => {
      let valA = a[campo as keyof Organizador] ?? '';
      let valB = b[campo as keyof Organizador] ?? '';
      
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      
      if (valA < valB) return this.ordenAsc() ? -1 : 1;
      if (valA > valB) return this.ordenAsc() ? 1 : -1;
      return 0;
    });

    this.limpiarFiltro();
    this.thFiltro()[campo as keyof ThFiltro] = this.ordenAsc() ? 'asc' : 'desc';
  }

  aplicarFiltros() {
    const datos = this.organizadores().filter(org => {
        // Búsqueda
        if (this.filtroBusqueda()) {
          const searchable = `${org.nombre} ${org.rfc} ${org.contacto_nombre} ${org.email} ${org.telefono}`.toLowerCase();
          if (!searchable.includes(this.filtroBusqueda()||'')) return false;
        }
        // Tipo
        if (this.filtroTipo() && org.tipo !== this.filtroTipo()) return false;
        // Antigüedad
        if (this.filtroAntiguedad()) {
          if (parseInt(org.antiguedad) < parseInt(this.filtroAntiguedad())) return false;
        }
        return true;
    });
    this._filtrado.update(() => [...datos]);
  }

  limpiarFiltros() {
    this.filtroBusqueda.set(null);
    this.filtroTipo.set('');
    this.filtroAntiguedad.set('');
    this.aplicarFiltros();
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
