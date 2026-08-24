import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tab } from '../../enum/Tab.enum';

@Component({
  selector: 'app-nav-vertical',
  standalone: true,
  imports: [],
  templateUrl: './nav-vertical.component.html',
  styleUrl: './nav-vertical.component.css'
})
export class NavVerticalComponent {
  @Input() tabActive!:Tab;
  @Output() onChangeTab: EventEmitter<Tab> = new EventEmitter<Tab>();
  tabs = Tab;

  changeTab(tab: Tab) {
    sessionStorage.setItem('tab', tab.etiqueta);
    this.onChangeTab.emit(tab);
  }

  isActive(tab: Tab): string {
    return this.tabActive == tab ? 'nav-item active' : 'nav-item';
  }

}
