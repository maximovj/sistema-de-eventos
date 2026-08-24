import { SettingsStorageService } from './core/services/settings-storage/settings-storage.service';
import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyCounterButtonComponent } from '@repo/ui';
import { TopHeaderComponent, NavVerticalComponent } from './shared/components';
import { TabEventosComponent, TabDashboardComponent } from './features';
import { Tab } from './shared/enums/Tab.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TopHeaderComponent, 
    NavVerticalComponent, 
    TabDashboardComponent,
    TabEventosComponent
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
