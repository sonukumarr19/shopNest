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
    return this.http.get<Product[]>('http://localhost:3000/customer/new-products');
  }

  getFeaturedProducts(){
    return this.http.get<Product[]>('http://localhost:3000/customer/featured-products');
  }

  getCategories() {
    return this.http.get<Category[]>('http://localhost:3000/customer/categories');
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
    return this.http.get<{ products: Product[] }>('http://localhost:3000/customer/products', {
      params: searchQuery
    });
  }

  getProductById(id:string){
    return this.http.get<Product>(`http://localhost:3000/customer/product/${id}`)
  }

}
