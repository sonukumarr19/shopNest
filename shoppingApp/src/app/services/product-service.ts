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
  return this.http.get<Product[]>('http://localhost:3000/product');
  }

  getProductById(id: string): Observable<Product> {
  return this.http.get<Product>(`http://localhost:3000/product/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
  return this.http.post<Product>('http://localhost:3000/product', product);
  }

  updateProduct(id: string, product: Product) {
    return this.http.put(`http://localhost:3000/product/${id}`, product);
  }

  deleteProduct(id: string){
    return this.http.delete(`http://localhost:3000/product/${id}`);
  }

}
