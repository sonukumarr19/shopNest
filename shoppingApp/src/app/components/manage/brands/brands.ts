import { Component, inject } from '@angular/core';
import { BrandService } from '../../../services/brand-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [CommonModule, FormsModule ,RouterLink],
  templateUrl: './brands.html',
  styleUrl: './brands.css'
})
export class Brands {
  brandService = inject(BrandService);

  brands: any[] = [];
  pagedBrands: any[] = [];

  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  constructor() {
    this.loadBrands();
  }

  loadBrands() {
    this.brandService.getBrands().subscribe((data: any[]) => {
      this.brands = data;
      this.updatePagination();
    });
  }

  deleteBrand(id: string) {
    if (confirm('Are you sure you want to delete this brand?')) {
      this.brandService.deleteBrand(id).subscribe({
        next: () => {
          alert('Brand deleted successfully!');
          this.loadBrands();
        },
        error: (err) => {
          console.error('Error deleting brand:', err);
          alert('Something went wrong!');
        }
      });
    }
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.brands.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedBrands = this.brands.slice(start, end);
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
