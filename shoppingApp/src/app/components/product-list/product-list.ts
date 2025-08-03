import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CustomerService } from '../../services/customer-service';
import { CategoryService } from '../../services/category-service';
import { BrandService } from '../../services/brand-service';

import { Product } from '../../types/product';
import { Category } from '../../types/category';
import { Brand } from '../../types/brand';

interface Filter {
  categoryIds: string[];
  brandIds: string[];
  priceRange: { min: number; max: number };
  rating: number;
  inStock: boolean;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule,NgFor, RouterLink],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  providers: [CustomerService]
})
export class ProductList implements OnInit {
  products: (Product & { categoryName?: string; brandName?: string })[] = [];
  filteredProducts: typeof this.products = [];
  categories: Category[] = [];
  brands: Brand[] = [];

  searchTerm = '';
  sortBy = 'popularity';

  filters: Filter = {
    categoryIds: [],
    brandIds: [],
    priceRange: { min: 0, max: 200000 },
    rating: 0,
    inStock: true
  };

  showAllBrands = false;
  availableCategories: Category[] = [];
  availableBrands: Brand[] = [];

  private customerService = inject(CustomerService);
  private categoryService = inject(CategoryService);
  private brandService = inject(BrandService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.loadInitialDataWithQueryParams();
  }

  private loadInitialDataWithQueryParams() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.availableCategories = categories;

      this.brandService.getBrands().subscribe(brands => {
        this.brands = brands;
        this.availableBrands = brands;

        this.route.queryParams.subscribe(params => {
          const categoryIdFromUrl: string | null = params['category'];
          const searchFromUrl: string | null = params['search'];

          if (searchFromUrl) {
            this.searchTerm = searchFromUrl;
          }

          if (categoryIdFromUrl) {
            const matchingCategory = this.categories.find(c => c._id === categoryIdFromUrl);
            if (matchingCategory) {
              this.filters.categoryIds = [matchingCategory._id!];
            }
          }

          this.loadProducts();
        });
      });
    });
  }

  private async loadProducts() {
    // If multiple categories are selected, load products for each category and combine them
    if (this.filters.categoryIds.length > 1) {
      await this.loadProductsFromMultipleCategories();
    } else {
      // Single category or no category filter
      await this.loadProductsFromSingleCategory();
    }
  }

  private async loadProductsFromMultipleCategories() {
    try {
      console.log('Loading products from multiple categories:', this.filters.categoryIds);
      
      const allProductsPromises = this.filters.categoryIds.map(categoryId => {
        const searchQuery = {
          searchTerm: this.searchTerm,
          categoryId: categoryId,
          brandId: this.filters.brandIds.length > 0 ? this.filters.brandIds[0] : '',
          page: 1,
          pageSize: 50, // Increased to get more products per category
          sortBy: this.sortBy,
          sortOrder: 'desc' as 'desc' | 'asc'
        };

        console.log('Loading products for category:', categoryId, searchQuery);
        return this.customerService.getProducts(searchQuery).toPromise();
      });

      const results = await Promise.all(allProductsPromises);
      
      // Combine all products and remove duplicates based on product ID
      const allProducts: Product[] = [];
      const seenProductIds = new Set<string>();

      results.forEach(res => {
        if (res && res.products) {
          res.products.forEach(product => {
            if (!seenProductIds.has(product._id!)) {
              seenProductIds.add(product._id!!);
              allProducts.push(product);
            }
          });
        }
      });

      // Shuffle products when multiple categories are selected
      const shuffledProducts = this.shuffleArray([...allProducts]);
      console.log('Products reshuffled for multiple categories');

      this.products = shuffledProducts.map(p => ({
        ...p,
        inStock: p.inStock ?? true,
        available: p.available ?? true,
        categoryName: this.getCategoryName(p.categoryId),
        brandName: this.getBrandName(p.brandId)
      }));

      console.log('Combined and shuffled products from multiple categories:', this.products);
      this.filteredProducts = [...this.products];
      this.applyFilters();

    } catch (error) {
      console.error('Failed to fetch products from multiple categories:', error);
    }
  }

  private async loadProductsFromSingleCategory() {
    const searchQuery = {
      searchTerm: this.searchTerm,
      categoryId: this.filters.categoryIds.length > 0 ? this.filters.categoryIds[0] : '',
      brandId: this.filters.brandIds.length > 0 ? this.filters.brandIds[0] : '',
      page: 1,
      pageSize: 10,
      sortBy: this.sortBy,
      sortOrder: 'desc' as 'desc' | 'asc'
    };

    console.log('Loading products with search query:', searchQuery);

    this.customerService.getProducts(searchQuery).subscribe({
      next: (res: { products: Product[] }) => {
        const data = res.products ?? [];

        this.products = data.map(p => ({
          ...p,
          inStock: p.inStock ?? true,
          available: p.available ?? true,
          categoryName: this.getCategoryName(p.categoryId),
          brandName: this.getBrandName(p.brandId)
        }));
        console.log('Products loaded:', this.products);
        this.filteredProducts = [...this.products];
        this.applyFilters();
      },
      error: err => console.error('Failed to fetch products:', err)
    });
  }

  getCategoryName(categoryId: string): string {
    return this.categories.find(c => c._id === categoryId)?.name || 'Unknown Category';
  }

  getBrandName(brandId: string): string {
    return this.brands.find(b => b._id === brandId)?.name || 'Unknown Brand';
  }

  get visibleBrands(): Brand[] {
    return this.showAllBrands ? this.availableBrands : this.availableBrands.slice(0, 6);
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchTerm || product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.filters.categoryIds.length === 0 || this.filters.categoryIds.includes(product.categoryId);
      const matchesBrand = this.filters.brandIds.length === 0 || this.filters.brandIds.includes(product.brandId);
      const matchesPrice = product.price >= this.filters.priceRange.min && product.price <= this.filters.priceRange.max;
      const matchesStock = !this.filters.inStock || product.inStock;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock;
    });

    this.applySorting();
  }

  applySorting() {
    switch (this.sortBy) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        this.filteredProducts.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
        break;
      case 'random':
        // Apply shuffle when random sort is selected
        this.filteredProducts = this.shuffleArray([...this.filteredProducts]);
        break;
      default:
        // For multiple categories, keep the shuffled order from loadProductsFromMultipleCategories
        // For single category, maintain the original order
        break;
    }
  }

  /**
   * Shuffles an array using Fisher-Yates algorithm
   * @param array - Array to shuffle
   * @returns Shuffled array
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Reshuffles the current product list
   * Useful for giving users a "refresh" option
   */
  reshuffleProducts() {
    console.log('Manually reshuffling products');
    this.filteredProducts = this.shuffleArray([...this.filteredProducts]);
  }

  onCategoryChange(categoryId: string, event: any) {
    const list = this.filters.categoryIds;
    console.log('Category change:', categoryId, event.target.checked);
    event.target.checked ? list.push(categoryId) : list.splice(list.indexOf(categoryId), 1);
    console.log('Updated category filters:', this.filters.categoryIds);
    
    // Clear search term when changing categories
    this.searchTerm = '';
    
    // Reload products to get data from all selected categories
    this.loadProducts();
  }

  onBrandChange(brandId: string, event: any) {
    const list = this.filters.brandIds;
    event.target.checked ? list.push(brandId) : list.splice(list.indexOf(brandId), 1);
    console.log('Updated brand filters:', this.filters.brandIds);
    
    // Reload products when brand filters change
    this.loadProducts();
  }

  onPriceRangeChange() {
    this.applyFilters();
  }

  onStockChange(event: any) {
    this.filters.inStock = event.target.checked;
    this.applyFilters();
  }

  onSortChange() {
    this.applySorting();
  }

  onSearchChange() {
    this.loadProducts();
  }

  toggleBrandVisibility() {
    this.showAllBrands = !this.showAllBrands;
  }

  clearFilters() {
    this.filters = {
      categoryIds: [],
      brandIds: [],
      priceRange: { min: 0, max: 200000 },
      rating: 0,
      inStock: true
    };
    this.searchTerm = '';
    this.loadProducts();
  }

  formatPrice(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }

  /**
   * TrackBy function for product list performance optimization
   */
  trackByProductId(index: number, product: any): string {
    return product._id;
  }
}