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
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  
  @ContentChild('breadcrumb') breadcrumbContent: any;
  hasBreadcrumb: boolean = false;

  ngAfterContentInit() {
    this.hasBreadcrumb = !!this.breadcrumbContent;
  }
}
