import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../services/category-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule ,RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories {
  categoryService = inject(CategoryService);

  categories: any[] = [];
  pagedCategories: any[] = [];

  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  constructor() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
      this.updatePagination();
    });
  }

  deleteCategory(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          alert('Category deleted successfully!');
          this.loadCategories();
        },
        error: (err) => {
          console.error('Error deleting category:', err);
          alert('Something went wrong!');
        }
      });
    }
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedCategories = this.categories.slice(start, end);
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
