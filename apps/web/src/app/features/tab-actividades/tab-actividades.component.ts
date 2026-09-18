import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TabContentComponent } from '../../shared/components';
import { 
  SpinnerComponent,
  StatsActividadesComponent,
  GridTarjetasActividadesComponent,
  PaginacionActividadesComponent,
  FiltrosActividadesComponent
} from '@repo/ui';

@Component({
  selector: 'app-tab-actividades',
  standalone: true,
  imports: [
    CommonModule,
    TabContentComponent,
    SpinnerComponent,
    StatsActividadesComponent,
    PaginacionActividadesComponent,
    GridTarjetasActividadesComponent
],
  templateUrl: './tab-actividades.component.html',
  styleUrl: './tab-actividades.component.css'
})
export class TabActividadesComponent {

  cargando = signal<boolean>(false);

}
