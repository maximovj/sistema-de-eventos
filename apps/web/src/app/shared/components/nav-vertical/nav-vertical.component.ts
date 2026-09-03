import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { SettingsStorageService } from '@repo/shared-services';
import { Tab } from '@repo/shared-types';

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

  private settings = inject(SettingsStorageService);
  
  changeTab(tab: Tab) {
    this.settings.modificarTab(tab.etiqueta);
  }

  isActive(tab: Tab): string {
    return this.settings.tabActive() == tab ? 'nav-item active' : 'nav-item';
  }

}
