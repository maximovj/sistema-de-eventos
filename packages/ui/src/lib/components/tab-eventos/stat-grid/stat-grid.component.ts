import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

type Color = 'purple' | 'pink' | 'blue' | 'green';

@Component({
  selector: 'lib-stat-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-grid.component.html',
  styleUrl: './stat-grid.component.css'
})
export class StatGridComponent {
  @Input() titulo: string | null = null;
  @Input() valor: string | number | null = null;
  @Input() subtitulo: string | null = null;
  @Input() colorIcon: Color | null = null;
  @Input() faIcon: string | null = null;
}
