import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettingsStorageService } from '@repo/shared-services';
import { TopHeaderComponent, NavVerticalComponent } from './shared/components';
import { TabEventosComponent, TabDashboardComponent, TabPredeterminadoComponent, TabOrganizadoresComponent } from './features';
import { Tab } from '@repo/shared-types';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TopHeaderComponent,
    NavVerticalComponent,
    TabDashboardComponent,
    TabEventosComponent,
    TabPredeterminadoComponent,
    TabOrganizadoresComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tabs = Tab;
  title = 'web';

  private settings = inject(SettingsStorageService);

  tabActive = computed(() => this.settings.tabActive());

  handleTabActive(tab: Tab) {
    //this.tabActive = tab;
  }

}
