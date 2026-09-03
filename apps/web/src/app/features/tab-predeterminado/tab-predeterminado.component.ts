import { Component } from '@angular/core';
import { TabContentComponent } from '../../shared/components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-predeterminado',
  standalone: true,
  imports: [TabContentComponent, CommonModule],
  templateUrl: './tab-predeterminado.component.html',
  styleUrl: './tab-predeterminado.component.css'
})
export class TabPredeterminadoComponent {

}
