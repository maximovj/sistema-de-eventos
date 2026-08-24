import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyCounterButtonComponent } from '@repo/ui';
import { TopHeaderComponent, NavVerticalComponent, ContentComponent } from './shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopHeaderComponent, NavVerticalComponent, ContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web';
}
