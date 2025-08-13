import { Product } from './../types/product';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
  return this.http.get<Product[]>('https://shopnest-wgn8.onrender.com/product');
  }

  getProductById(id: string): Observable<Product> {
  return this.http.get<Product>(`https://shopnest-wgn8.onrender.com/product/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
  return this.http.post<Product>('https://shopnest-wgn8.onrender.com/product', product);
  }

  updateProduct(id: string, product: Product) {
    return this.http.put(`https://shopnest-wgn8.onrender.com/product/${id}`, product);
  }

  deleteProduct(id: string){
    return this.http.delete(`https://shopnest-wgn8.onrender.com/product/${id}`);
  }

}
