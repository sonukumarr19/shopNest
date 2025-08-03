import { ProductService } from './../../../services/product-service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule ,RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css'
})

export class Products {
  ProductService = inject(ProductService);

  products: any[] = [];
  pagedProducts: any[] = [];

  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.ProductService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.updatePagination();
    });
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.ProductService.deleteProduct(id).subscribe({
        next: () => {
          alert('Product deleted successfully!');
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Something went wrong!');
        }
      });
    }
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedProducts = this.products.slice(start, end);
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
