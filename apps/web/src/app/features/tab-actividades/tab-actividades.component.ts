import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { TabContentComponent } from '../../shared/components';
import { 
  SpinnerComponent,
  StatsActividadesComponent,
  GridTarjetasActividadesComponent,
  PaginacionActividadesComponent,
  FiltrosActividadesComponent
} from '@repo/ui';
import { ActividadesService } from '@repo/shared-services';
import { delay, finalize } from 'rxjs';
import { Actividad } from '@repo/shared-types';

@Component({
  selector: 'app-tab-actividades',
  standalone: true,
  imports: [
    CommonModule,
    TabContentComponent,
    SpinnerComponent,
    StatsActividadesComponent,
    FiltrosActividadesComponent,
    GridTarjetasActividadesComponent,
    PaginacionActividadesComponent,
],
  templateUrl: './tab-actividades.component.html',
  styleUrl: './tab-actividades.component.css'
})
export class TabActividadesComponent implements OnInit {
  service = inject(ActividadesService);

  actividades = signal<Actividad[]>([]);
  cargando = signal<boolean>(false);

  // Estados computadas
  total = computed(() => this.actividades()?.length || 0);
  
  public ngOnInit(): void {
    this.cargandoActividades();
  }

  private cargandoActividades() {
    this.cargando.set(true);
    this.service
    .actividades()
    .pipe(
      delay(1700),
      finalize(() => this.cargando.set(false)),
    )
    .subscribe({
      next: (value) => {
        console.log("value => ", value);
        this.actividades.set(value);
      },
    });
  }

}
