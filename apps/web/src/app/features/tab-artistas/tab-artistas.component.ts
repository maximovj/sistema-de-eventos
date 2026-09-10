import { Component } from '@angular/core';
import { TabContentComponent } from "../../shared/components";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-artistas',
  standalone: true,
  imports: [
    CommonModule,
    TabContentComponent
  ],
  templateUrl: './tab-artistas.component.html',
  styleUrl: './tab-artistas.component.css'
})
export class TabArtistasComponent {

}
