import { Brand } from './../types/brand';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private http = inject(HttpClient);

  getBrands(): Observable<Brand[]> {
  return this.http.get<Brand[]>('http://localhost:3000/brand');
  }

  getBrandById(id: string): Observable<Brand> {
  return this.http.get<Brand>(`http://localhost:3000/brand/${id}`);
  }

  addBrand(name:String){
    return this.http.post('http://localhost:3000/brand',{
      name : name
    })
  }

  updateBrand(id: string, name: string) {
    return this.http.put(`http://localhost:3000/brand/${id}`, {
      name: name
    });
  }

  deleteBrand(id: string){
    return this.http.delete(`http://localhost:3000/brand/${id}`);
  }

}
