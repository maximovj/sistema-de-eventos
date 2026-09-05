import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tab-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-content.component.html',
  styleUrl: './tab-content.component.css'
})
export class TabContentComponent {
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() breadcrumbItem: string = '';
  
  @ContentChild('breadcrumb') breadcrumbContent: any;
  hasBreadcrumb: boolean = false;

  ngAfterContentInit() {
    this.hasBreadcrumb = !!this.breadcrumbContent;
  }
}
