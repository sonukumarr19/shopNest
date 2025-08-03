import { CustomerService } from './../../services/customer-service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../types/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html'
})
export class ProductDetail implements OnInit {
  selectedImageIndex = 0;
  selectedQuantity = 1;
  activeTab = 'description';
  zoomPosition = { x: 0, y: 0 };
  showZoom = false;
  product!: Product & {
    rating?: number;
    reviewCount?: number;
    reviews?: string[];
    highlights?: string[];
    specifications?: { category: string; specs: { [key: string]: string } }[];
    inStock?:Boolean;
  };
  deliveryInfo: string = "12 August 2025";
  Offers: string[] = [];
  similarProducts: Product[] = [];

  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);


  ngOnInit() {
  const id: string = this.route.snapshot.paramMap.get('id')!;
  console.log('Product ID:', id);

  this.customerService.getProductById(id).subscribe((result) => {
    this.product = {
      ...result,
      rating: this.getRandomRating(),
      reviewCount: this.getRandomReviewCount(),
      reviews: this.generateReviewsByCategory(result.categoryId),
      highlights: this.getHighlights(result.shortDescription),
      specifications: this.getSpecifications(result.description),
      inStock: true
    };

    // ✅ Fix: this.searchQuery → use a local variable instead
    const searchQuery = {
      searchTerm: '',
      categoryId: result.categoryId,
      brandId: '',
      page: 1,
      pageSize: 4,
      sortBy: 'price', // ✅ must be a valid field name (not value)
      sortOrder: 'desc' as 'desc' | 'asc'
    };

    // ✅ Fix: correct object + subscribe block
    this.customerService.getProducts(searchQuery).subscribe({
      next: (res) => {
        this.similarProducts = res.products;
      },
      error: (err) => {
        console.error('Error fetching similar products:', err);
      }
    });

    this.Offers = this.generateRandomOffers();

    console.log('Product details loaded:', this.product.specifications);
    console.log(this.product);
  }, error => {
    console.error('Error fetching product by ID:', error);
  });
}


  generateRandomOffers(): string[] {
    const allOffers = [
      '10% Instant Discount on HDFC Credit Cards',
      'Extra ₹500 off on ICICI Bank Debit Cards',
      'No Cost EMI on Bajaj Finserv and Axis Bank Cards',
      'Get ₹200 Cashback on Paytm Wallet',
      'Flat ₹100 off using SBI YONO App',
      'Buy with Flipkart Axis Bank Card and get 5% Unlimited Cashback',
      'Zero Down Payment on selected bank offers',
      '10% Cashback on Amazon Pay ICICI Credit Card',
      'Save up to ₹1,500 on Bank of Baroda Credit Cards'
    ];

    // Shuffle and return 3 random offers
    const shuffled = allOffers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }

  getHighlights(shortDesc: string): string[] {
    return shortDesc.split('.').filter(item => item.trim().length > 0).map(item => item.trim());
  }

  getSpecifications(desc: string): { category: string; specs: { [key: string]: string } }[] {
    const specs: { category: string; specs: { [key: string]: string } }[] = [];

    // Basic parsing strategy
    const generalSpecs: { [key: string]: string } = {};
    const specEntries = desc.split('.').map(s => s.trim()).filter(Boolean);

    for (const entry of specEntries) {
      if (entry.includes(':')) {
        const [key, value] = entry.split(':');
        generalSpecs[key.trim()] = value.trim();
      } else {
        // fallback: treat as a spec with default key
        generalSpecs['Detail ' + (Object.keys(generalSpecs).length + 1)] = entry;
      }
    }

    if (Object.keys(generalSpecs).length > 0) {
      specs.push({ category: 'General', specs: generalSpecs });
    }

    return specs;
  }



  getRandomReviewCount(): number {
    return Math.floor(Math.random() * 2000 + 100); // 100 to 2100
  }

  getRandomRating(): number {
    return Math.floor(Math.random() * 5) + 1; // 1 to 5
  }

  toggleWishlist(product: Product) {
    product.inWishlist = !product.inWishlist;
  }

  generateReviewsByCategory(category: string): string[] {
    const electronics = [
      "Battery life is great.",
      "Display is crisp and clear.",
      "Build quality feels premium.",
    ];
    const fashion = [
      "Fabric feels amazing!",
      "Fits perfectly.",
      "Stylish and trendy.",
    ];
    const generic = [
      "Good value for money.",
      "Would buy again.",
      "Product matches the description."
    ];

    if (!category) return generic;

    if (category.toLowerCase().includes('electronic')) return electronics;
    if (category.toLowerCase().includes('fashion')) return fashion;
    return generic;
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
  }

  onImageHover(event: MouseEvent) {
    const img = event.target as HTMLImageElement;
    const rect = img.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.zoomPosition = { x, y };
    this.showZoom = true;
  }

  onImageLeave() {
    this.showZoom = false;
  }

  changeQuantity(delta: number) {
    const newQuantity = this.selectedQuantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      this.selectedQuantity = newQuantity;
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  addToCart() {
    console.log('Added to cart:', this.product.name, 'Quantity:', this.selectedQuantity);
    // Add to cart logic here
  }

  buyNow() {
    console.log('Buy now:', this.product.name, 'Quantity:', this.selectedQuantity);
    // Buy now logic here
  }

  getStarArray(rating: number): boolean[] {
    const fullStars = Math.floor(rating);
    const stars: boolean[] = [];

    for (let i = 0; i < 5; i++) {
      stars.push(i < fullStars);
    }

    return stars;
  }

  formatPrice(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }

  get discountAmount(): number {
    return this.product ? Math.floor(this.product.price * (this.product.discount / 100)) : 0;
  }
}
