export interface Product{
  _id ?: string;
  name: string;
  shortDescription : string;           
  description : string;  
  images : Array<string>; // Assuming image is an array of strings (URLs or paths)
  price: number;    
  discount : number;
  categoryId : string ;
  brandId : string ;
  isFeatured : boolean;
  isNewProduct : boolean;
  available?: boolean; // optional but defaulted to true
  inWishlist?: boolean; // Optional property to track wishlist status
  inStock: boolean;
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
