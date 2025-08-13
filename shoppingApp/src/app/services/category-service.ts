
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
  return this.http.get<Category[]>('https://shopnest-wgn8.onrender.com/category');
  }

  getCategoryById(id: string): Observable<Category> {
  return this.http.get<Category>(`https://shopnest-wgn8.onrender.com/category/${id}`);
  }

  addCategory(name:String){
    return this.http.post('https://shopnest-wgn8.onrender.com/category',{
      name : name
    })
  }

  updateCategory(id: string, name: string) {
    return this.http.put(`https://shopnest-wgn8.onrender.com/category/${id}`, {
      name: name
    });
  }

  deleteCategory(id: string){
    return this.http.delete(`https://shopnest-wgn8.onrender.com/category/${id}`);
  }

}
