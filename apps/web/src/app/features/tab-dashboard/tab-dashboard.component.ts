import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContentComponent } from '../../shared/components';

@Component({
  selector: 'app-tab-dashboard',
  standalone: true,
  imports: [CommonModule, ContentComponent],
  templateUrl: './tab-dashboard.component.html',
  styleUrl: './tab-dashboard.component.css'
})
export class TabDashboardComponent {

}
