import { Component, computed, input } from '@angular/core';
import { Actividad, ActividadEstatus } from '@repo/shared-types';

@Component({
  selector: 'ui-stats-actividades',
  standalone: true,
  imports: [],
  templateUrl: './stats-actividades.component.html',
  styleUrl: './stats-actividades.component.css'
})
export class StatsActividadesComponent {
  actividades = input<Actividad[]>([]);

  total = computed(() => this.actividades?.length ?? 0);

  totalProceso = computed(() => this.actividades().filter(item => item.estatus === ActividadEstatus.EN_PROGRESO)?.length ?? 0);
  totalPendientes = computed(() => this.actividades().filter(item => item.estatus === ActividadEstatus.PENDIENTE)?.length ?? 0);
  totalCompletadas = computed(() => this.actividades().filter(item => item.estatus === ActividadEstatus.COMPLETADA)?.length ?? 0);

}
