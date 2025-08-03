import { WishlistService } from './../../services/wishlist-service';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { inject } from '@angular/core';
import { CustomerService } from '../../services/customer-service';
import { Product } from '../../types/product';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgFor, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  customerService = inject(CustomerService);
  wishListService = inject(WishlistService)
  router = inject(Router);      
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];
  searchQuery: string = '';
  
  // Carousel properties
  carouselSlides = [
    {
      id: 1,
      title: 'Summer Sale Collection',
      subtitle: 'Up to 70% OFF',
      description: 'Discover amazing deals on trending products',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      buttonText: 'Shop Now',
      bgGradient: 'from-purple-600 to-blue-600',
      categoryId: '6874dcde3762ed57f31975fa'
    },
    {
      id: 2,
      title: 'Electronics Mega Sale',
      subtitle: 'Best Prices Guaranteed',
      description: 'Latest gadgets and electronics at unbeatable prices',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80',
      buttonText: 'Explore Deals',
      bgGradient: 'from-green-600 to-teal-600',
      categoryId: '6874dcf13762ed57f31975fc'
    },
    {
      id: 3,
      title: 'Fresh Groceries',
      subtitle: 'Farm to Table',
      description: 'Fresh organic produce and daily essentials delivered to your doorstep',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      buttonText: 'Shop Groceries',
      bgGradient: 'from-green-600 to-emerald-600',
      categoryId: '6874dd313762ed57f3197600'
    },
    {
      id: 4,
      title: 'Home & Living',
      subtitle: 'Transform Your Space',
      description: 'Beautiful home decor and furniture collections',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80',
      buttonText: 'Shop Home',
      bgGradient: 'from-orange-600 to-yellow-600',
      categoryId: '6874dd133762ed57f31975fe'
    }
  ];
  
  currentSlide = 0;
  private intervalId: any;



  ngOnInit() {
    // Debug: Log all carousel slides and their categoryIds
    console.log('=== CAROUSEL SLIDES DEBUG ===');
    this.carouselSlides.forEach((slide, index) => {
      console.log(`Slide ${index}:`, {
        id: slide.id,
        title: slide.title,
        categoryId: slide.categoryId
      });
    });

    this.customerService.getNewProducts().subscribe((products) => {
      this.newProducts = products;
    }, (error) => { 
      console.error('Error fetching new products:', error);
    });

    this.customerService.getFeaturedProducts().subscribe((products) => {
      this.featuredProducts = products;
      console.log('Featured Products:', this.featuredProducts);
    }, (error) => {
      console.error('Error fetching featured products:', error);
    });

    this.wishListService.init();
    // Start auto-slide
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Carousel methods
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselSlides.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.carouselSlides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onCarouselMouseEnter() {
    this.stopAutoSlide();
  }

  onCarouselMouseLeave() {
    this.startAutoSlide();
  }

  toggleWishlist(product: Product) {
    product.inWishlist = !product.inWishlist;
  }

  isInWishList(product:Product){
    let productExist = this.wishListService.wishLists.find(x=>x._id == product._id);
    if(productExist){
      return true;
    }
    else{
      return false;
    }
  }

  addToWishList(product:Product){
    console.log("Button hit")
    console.log(product);
    if(this.isInWishList(product)){
      this.wishListService
      .removeFromWishList(product._id!)
      .subscribe((result)=>{
        console.log("result" , result);
        this.wishListService.init();
      })
    }else{
      this.wishListService
      .addInWishList(product._id!)
      .subscribe((result)=>{
        console.log("res", result);
        this.wishListService.init();
      })
    }
  }
  
  // Updated method with better debugging and event handling
  searchProducts(categoryId: string, event?: Event) {
    // Prevent event bubbling if event is provided
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      
      // Additional debug info from the event target
      const target = event.target as HTMLElement;
    }
    
    this.searchQuery = '';
    
    if (categoryId) {
      this.router.navigate(['/products'], { queryParams: { category: categoryId } });
    } else {
      console.error('No categoryId provided');
    }
  }

  // TrackBy function for better performance
  trackBySlideId(index: number, slide: any): number {
    return slide.id;
  }

  // Alternative method to handle slide button clicks more explicitly
  onSlideButtonClick(slideIndex: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    const slide = this.carouselSlides[slideIndex];
    
    if (slide && slide.categoryId) {
      this.searchProducts(slide.categoryId);
    } else {
      console.error('Slide or categoryId not found for index:', slideIndex);
    }
  }
}