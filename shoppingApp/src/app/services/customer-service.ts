import { Injectable , inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../types/product';
import { Category } from '../types/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);  

  getNewProducts(){
    return this.http.get<Product[]>('https://shopnest-wgn8.onrender.com/customer/new-products');
  }

  getFeaturedProducts(){
    return this.http.get<Product[]>('https://shopnest-wgn8.onrender.com/customer/featured-products');
  }

  getCategories() {
    return this.http.get<Category[]>('https://shopnest-wgn8.onrender.com/customer/categories');
  }

  getProducts(searchQuery: {
    searchTerm?: string;
    categoryId?: string;
    brandId?: string;
    sortBy?: string;  
    sortOrder?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
  }): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>('https://shopnest-wgn8.onrender.com/customer/products', {
      params: searchQuery
    });
  }

  getProductById(id:string){
    return this.http.get<Product>(`https://shopnest-wgn8.onrender.com/customer/product/${id}`)
  }

}
