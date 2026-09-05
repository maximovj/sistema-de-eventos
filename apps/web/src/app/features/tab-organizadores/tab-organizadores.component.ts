import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabContentComponent } from '../../shared/components';
import { OrganizadoresService } from '@repo/shared-services';
import { SpinnerComponent } from '@repo/ui';
import { Organizador, TipoOrganizador } from '@repo/shared-types';
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
  public organizadores = signal<Organizador[]>([]);
  public cargando = signal<boolean>(false);

  // Estados/Funciones computadas
  public total = computed(() => this.organizadores().length || 0);
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
      },
      complete: () => {
        this.cargando.set(false);
      }
    });
  }


}
