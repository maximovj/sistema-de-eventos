import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  @Input() titulo: string | null = null;
  @Input() subtitulo: string | null = null;
  @ContentChild('breadcrumb') breadcrumb!: TemplateRef<any>;

}
