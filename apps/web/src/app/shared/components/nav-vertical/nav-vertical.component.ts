import { Component, EventEmitter, Output } from '@angular/core';
import { Tab } from '../../enum/Tab.enum';

@Component({
  selector: 'app-nav-vertical',
  standalone: true,
  imports: [],
  templateUrl: './nav-vertical.component.html',
  styleUrl: './nav-vertical.component.css'
})
export class NavVerticalComponent {
  @Output() onChangeTab: EventEmitter<Tab> = new EventEmitter<Tab>();
  tabs = Tab;
  tabActive: string = 'dashboard';

  changeTab(tab: Tab) {
    sessionStorage.setItem('tab', tab.etiqueta);
    this.onChangeTab.emit(tab);
  }

}
