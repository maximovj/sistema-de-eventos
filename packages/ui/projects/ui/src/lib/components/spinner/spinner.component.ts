import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  // Tamaño del spinner
  @Input() size: 'xs'  | 'small' | 'medium' | 'large' = 'small';
  
  // Margen personalizado
  @Input() margin?: string;
  
  // Alineación
  @Input() align: 'start' | 'center' | 'end' = 'start';
  
  // Clases adicionales
  @Input() customClass?: string;
  
  // Tamaño en px (opcional, para más control)
  @Input() customSize?: number;
  
  get sizeClass(): string {
    return `spinner-${this.size}`;
  }
  
  get alignmentClass(): string {
    return `align-${this.align}`;
  }
}
