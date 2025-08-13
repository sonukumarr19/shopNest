import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  http = inject(HttpClient);
  wishLists:Product[] = []; 

  init(){
    this.getWishList().subscribe((result)=>{
      this.wishLists = result;
    })
  }
  
  getWishList(){
    return this.http.get<Product[]>(`https://shopnest-wgn8.onrender.com/customer/wishlists`)
  }

  addInWishList(id:string){
    return this.http.post(`https://shopnest-wgn8.onrender.com/customer/wishlists/${id}`,{})
  }

  removeFromWishList(id:string){
    return this.http.delete(`https://shopnest-wgn8.onrender.com/customer/wishlists/${id}`,{})
  }

}
