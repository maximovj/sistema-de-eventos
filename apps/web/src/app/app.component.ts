import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyCounterButtonComponent } from '@repo/ui';
import { TopHeaderComponent, NavVerticalComponent } from './shared/components';
import { TabEventosComponent } from './features';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopHeaderComponent, NavVerticalComponent, TabEventosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web';
}
