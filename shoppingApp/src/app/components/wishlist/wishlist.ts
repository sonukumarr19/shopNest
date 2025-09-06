import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist-service';
import { Product } from '../../types/product';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist implements OnInit {
  wishlistItems: Product[] = [];
  loading = false;

  private wishlistService = inject(WishlistService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
  this.loading = true;

  this.wishlistService.getWishList().subscribe({
      next: (items: Product[]) => {
        const seen = new Set<string>();
        this.wishlistItems = items.filter(item => {
          if (seen.has(item._id!)) return false;
          seen.add(item._id!);
          return true;
        });

        // Add availability 
        this.wishlistItems.forEach(item => {
          if (!item.availability) {
            item.availability = Math.random() > 0.7 ? 'limited' : 'in-stock';
          }
        });

        console.log("Filtered Wishlist:", this.wishlistItems);
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading wishlist:", err);
        this.loading = false;
      }
    });
  }

  removeFromWishList(itemId: string): void {
    this.wishlistService.removeFromWishList(itemId).subscribe({
      next: (result) => {
        console.log('Wishlist after removal:', result);
        // Remove from local array
        this.wishlistItems = this.wishlistItems.filter(item => item._id !== result.productId);
        this.wishlistService.init(); // refresh service state if needed
      },
      error: (err) => console.error('Error removing item:', err)
    });
  }



  addToBag(item: Product): void {
    if (item.availability === 'out-of-stock') return; 
    console.log('Added to bag:', item);
    // 👉 Optionally call cartService.add(item)
  }

  selectSize(item: Product, size: string): void {
    item.selectedSize = size;
  }

  getDiscountedPrice(item: Product): number {
    return item.price ? item.price - item.price * (item.discount / 100) : 0;
  }

  getStarArray(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating || 0));
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  isInWishlist(product: Product): boolean {
    return this.wishlistItems.some(item => item._id === product._id);
  }
}
