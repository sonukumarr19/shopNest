import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category-service';
import { ProductService } from '../../../services/product-service';
import { BrandService } from '../../../services/brand-service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
  TotalCategories = 0;
  TotalProducts = 0;
  TotalBrands = 0;

  categoryService = inject(CategoryService);
  productService = inject(ProductService);
  brandService = inject(BrandService);

  constructor(private router: Router) {}

  navigateToCategories() {
    this.router.navigate(['/admin/categories']);
  }

  navigateToProducts() {
    this.router.navigate(['/admin/products']);
  }

  navigateToBrands() {
    this.router.navigate(['/admin/brands']);
  }

  ngOnInit() {
    this.loadCategoryCount();
    this.loadProductCount();
    this.loadBrandCount();
  }

  private loadCategoryCount() {
    this.categoryService.getCategories().subscribe(categories => {
      this.TotalCategories = categories.length;
    });
  }

  private loadProductCount() {
    this.productService.getProducts().subscribe(products => {
      this.TotalProducts = products.length;
    });
  }

  private loadBrandCount() {
    this.brandService.getBrands().subscribe(brands => {
      this.TotalBrands = brands.length;
    });
  }

}