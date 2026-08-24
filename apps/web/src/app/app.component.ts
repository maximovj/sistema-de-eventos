import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyCounterButtonComponent } from '@repo/ui';
import { TopHeaderComponent, NavVerticalComponent } from './shared/components';
import { TabEventosComponent, TabDashboardComponent } from './features';
import { Tab } from './shared/enum/Tab.enum';

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
  tabActive: Tab = Tab.TabDashboard;
  title = 'web';

  handleTabActive(tab: Tab) {
    this.tabActive = tab;
  }

}
