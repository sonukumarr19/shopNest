import { CategoryService } from './../../services/category-service';
import { Component, OnInit , inject} from '@angular/core';
import { NgFor } from '@angular/common';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CustomerService } from '../../services/customer-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [NgFor, RouterLink ,FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class Header implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  searchQuery: string = '';

  customerService = inject(CustomerService);
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit() {
    this.customerService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        // console.log('Categories loaded:', this.categories);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });   
  }


  onCategoryChange(id: string) {   
    this.selectedCategory = this.categories.find(category => category._id === id) || null;  
    this.searchQuery= '';
    if (id) {
      this.router.navigate(['/products'], { queryParams: { category: id } });
    } 
  }

  onSearch(query: string) {
    if (query) {
      this.router.navigate(['/products'], { queryParams: { search: query } });
    } else {
      this.router.navigate(['/products']);
    }
  }

  goToCart() {
    console.log('Navigate to cart');
  }

  openProfile() {
    console.log('Open profile');
  }
  
}
