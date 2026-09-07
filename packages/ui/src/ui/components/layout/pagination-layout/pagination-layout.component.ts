import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-pagination-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-layout.component.html',
  styleUrl: './pagination-layout.component.css'
})
export class PaginationLayoutComponent {
  @Input() currentPage = 1;
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
  @Input() itemLabel = 'elementos';

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get firstItem(): number {
    return this.totalItems === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get lastItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  get previousDisabled(): boolean {
    return this.currentPage <= 1 || this.totalPages === 0;
  }

  get nextDisabled(): boolean {
    return this.currentPage >= this.totalPages || this.totalPages === 0;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  changePageSize(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    if (value > 0 && value !== this.pageSize) {
      this.pageSizeChange.emit(value);
    }
  }
}