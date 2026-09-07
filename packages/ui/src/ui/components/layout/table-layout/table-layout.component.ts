import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationLayoutComponent } from '../pagination-layout/pagination-layout.component';

@Component({
  selector: 'ui-table-layout',
  standalone: true,
  imports: [CommonModule, PaginationLayoutComponent],
  templateUrl: './table-layout.component.html',
  styleUrl: './table-layout.component.css'
})
export class TableLayoutComponent {
  @Input() currentPage = 1;
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
  @Input() itemLabel = 'elementos';
  @Input() empty = false;
  @Input() loading = false;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
}