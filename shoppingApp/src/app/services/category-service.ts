
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
  return this.http.get<Category[]>('http://localhost:3000/category');
  }

  getCategoryById(id: string): Observable<Category> {
  return this.http.get<Category>(`http://localhost:3000/category/${id}`);
  }

  addCategory(name:String){
    return this.http.post('http://localhost:3000/category',{
      name : name
    })
  }

  updateCategory(id: string, name: string) {
    return this.http.put(`http://localhost:3000/category/${id}`, {
      name: name
    });
  }

  deleteCategory(id: string){
    return this.http.delete(`http://localhost:3000/category/${id}`);
  }

}
