import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabContentComponent } from '../../shared/components';

@Component({
  selector: 'app-tab-dashboard',
  standalone: true,
  imports: [CommonModule, TabContentComponent],
  templateUrl: './tab-dashboard.component.html',
  styleUrl: './tab-dashboard.component.css'
})
export class TabDashboardComponent {

}
