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
  return this.http.get<Brand[]>('https://shopnest-wgn8.onrender.com');
  }

  getBrandById(id: string): Observable<Brand> {
  return this.http.get<Brand>(`https://shopnest-wgn8.onrender.com/${id}`);
  }

  addBrand(name:String){
    return this.http.post('https://shopnest-wgn8.onrender.com',{
      name : name
    })
  }

  updateBrand(id: string, name: string) {
    return this.http.put(`https://shopnest-wgn8.onrender.com/${id}`, {
      name: name
    });
  }

  deleteBrand(id: string){
    return this.http.delete(`https://shopnest-wgn8.onrender.com/${id}`);
  }

}
