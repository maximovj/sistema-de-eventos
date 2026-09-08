import { CommonModule } from '@angular/common';
import { Component, computed, Input } from '@angular/core';
import { Sede } from '@repo/shared-types';
import { StatBoxComponent } from '../../../shared/stat-box/stat-box.component';
import { SedeEstado } from '@repo/shared-types';

@Component({
  selector: 'ui-stats-sedes',
  standalone: true,
  imports: [CommonModule, StatBoxComponent],
  templateUrl: './stats-sedes.component.html',
  styleUrl: './stats-sedes.component.css'
})
export class StatsSedesComponent {
  @Input() sedes: Sede[] = [];

  // Estados computadas
  public total = computed(() => this.sedes.length || 0);
  
  public capacidadTotal = computed(() => {
    const total = this.sedes.reduce((acc, item) => acc += item.capacidad, 0);
    return new Intl.NumberFormat('es-MX').format(total || 0);
  });

  public costoTotal = computed(() => {
    const total = this.sedes.reduce((acc, item) => acc += item.costoRenta, 0);
    return new Intl.NumberFormat('es-MX',{
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(total);
  });

  public disponibles = computed(() => this.sedes.filter(s => s.estado === SedeEstado.DISPONIBLE).length);
  
  public ocupadas = computed(() => this.sedes.filter(s => s.estado === SedeEstado.OCUPADA).length);

  public mantenimientos = computed(() => this.sedes.filter(s => s.estado === SedeEstado.MANTENIMIENTO).length);

}
