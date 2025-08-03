import { BrandService } from './../../../services/brand-service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product-service';
import { CategoryService } from '../../../services/category-service'; 
import { Product } from '../../../types/product';
import { Category } from '../../../types/category';
import { Brand } from '../../../types/brand';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductForm implements OnInit {
  form!: FormGroup;
  isEdit = false;
  categories: Category[] = []; 
  brands: Brand[] = [];

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService); 
  private brandService = inject(BrandService); 
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.initForm();
    this.loadCategories();
    this.loadBrands();

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isEdit = true;
      this.productService.getProductById(productId).subscribe({
        next: (product: Product) => {
          this.form.patchValue({
            name: product.name,
            shortDescription: product.shortDescription,
            description: product.description,
            price: product.price,
            discount: product.discount,
            categoryId: product.categoryId,
            brandId: product.brandId,
            isFeatured: product.isFeatured,
            isNewProduct: product.isNewProduct
          });
          this.setImages(product.images);
        },
        error: err => console.error('Error loading product:', err)
      });
    }
  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required],
      images: this.fb.array([this.fb.control('', Validators.required)]),
      isFeatured: [false],
      isNewProduct: [false]
    });
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: err => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  private loadBrands() {
    this.brandService.getBrands().subscribe({
      next: (brands) => {
        this.brands = brands;
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
      }
    });
  }

  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }

  addImageField() {
    this.images.push(this.fb.control('', Validators.required));
  }

  removeImageField(index: number) {
    this.images.removeAt(index);
  }

  submitForm() {
    if (this.form.invalid) return;
    const newProduct = this.form.value;
    this.productService.addProduct(newProduct).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.router.navigate(['/admin/products']);
      },
      error: err => {
        console.error('Error adding product:', err);
        alert('Something went wrong!');
      }
    });
  }

  updateProduct() {
    if (this.form.invalid) return;
    const productId = this.route.snapshot.paramMap.get('id');
    console.log(productId); 
    if (productId) {
      console.log(this.form.value);
      this.productService.updateProduct(productId, this.form.value).subscribe({
        next: () => {
          console.log(this.form.value);
          alert('Product updated successfully!');
          this.router.navigate(['/admin/products']);
        },
        error: err => {
          console.error('Error updating product:', err);
          alert('Something went wrong!');
        }
      });
    }
  }

  private setImages(imageArray: string[]) {
    this.images.clear();
    imageArray.forEach(img => this.images.push(this.fb.control(img, Validators.required)));
  }
}
