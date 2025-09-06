import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  http = inject(HttpClient);
  wishLists:Product[] = []; 

  constructor(private authService: AuthService) {}

  init(){
    this.getWishList().subscribe((result)=>{
      this.wishLists = result;
    })
  }

  // fetchWishlist() {
  //   const userId = this.authService.getUserId();
  //   return this.http.get<Product[]>(`https://shopnest-wgn8.onrender.com/customer/wishlist/${userId}`);
  // }
  
  getWishList(){
    return this.http.get<Product[]>(`https://shopnest-wgn8.onrender.com/customer/wishlists`)
  }

  addInWishList(id:string){
    return this.http.post(`https://shopnest-wgn8.onrender.com/customer/wishlists/${id}`,{})
  }

  removeFromWishList(id:string){
    return this.http.delete<{ success: boolean, productId: string }>(`https://shopnest-wgn8.onrender.com/customer/wishlists/${id}`,{})
  }
}
