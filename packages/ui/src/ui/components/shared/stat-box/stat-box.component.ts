import { Component, Input } from '@angular/core';

type Color = 'purple' | 'pink' | 'blue' | 'green';

@Component({
  selector: 'ui-stat-box',
  standalone: true,
  imports: [],
  templateUrl: './stat-box.component.html',
  styleUrl: './stat-box.component.css'
})
export class StatBoxComponent {
  @Input() titulo: string | null = null;
  @Input() valor: string | number | null = null;
  @Input() subtitulo: string | null = null;
  @Input() colorIcon: Color | null = null;
  @Input() faIcon: string | null = null;
}
