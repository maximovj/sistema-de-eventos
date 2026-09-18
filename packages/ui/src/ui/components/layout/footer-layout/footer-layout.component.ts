import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-footer-layout',
  standalone: true,
  imports: [],
  templateUrl: './footer-layout.component.html',
  styleUrl: './footer-layout.component.css'
})
export class FooterLayoutComponent {
  modelo = input<string>();
  total = input<number>();
}
