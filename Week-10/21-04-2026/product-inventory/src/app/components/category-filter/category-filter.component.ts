import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent {
  @Input() categories: string[] = [];
  @Output() filterChange = new EventEmitter<string>();

  selectedCategory = '';

  // Emits the currently selected category to the parent component.
  onFilter(): void {
    this.filterChange.emit(this.selectedCategory);
  }
}
