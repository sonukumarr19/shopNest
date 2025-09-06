export interface Product{
  _id ?: string;
  name: string;
  shortDescription : string;           
  description : string;  
  images : Array<string>; 
  price: number;    
  discount : number;
  categoryId : string ;
  brandId : string ;
  isFeatured : boolean;
  isNewProduct : boolean;
  available?: boolean; 
  inWishlist?: boolean; 
  inStock: boolean;
  sizes?: string[];          
  selectedSize?: string;      
  availability?: 'in-stock' | 'out-of-stock' | 'limited';
  rating?: number;
  reviews?: string[];
  userId: string; // Assuming this is the user who added the product
}
 

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   categoryId: string;
//   brandId: string;
//   description?: string;

//   // Add these missing fields:
//   images?: string[];            // for product images
//   image?: string;               // if you're using a single image somewhere
//   inStock?: boolean;
//   features?: string[];
//   rating?: number;
//   reviews?: {
//     userId: string;
//     comment: string;
//     rating: number;
//   }[];
//   originalPrice?: number;
//   category?: string;            // optional, if you're showing category name
//   brand?: string;               // optional, if you're showing brand name
// }

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   brand: string;
//   category: string;
//   rating?: number;
//   reviews?: number;
//   discount?: number;
//   inStock: boolean;
//   available?: boolean; // optional but defaulted to true
//   features?: string[];
//   image?: string;
// }
