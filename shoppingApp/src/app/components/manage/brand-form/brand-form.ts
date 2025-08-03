import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../services/brand-service';   

@Component({
  selector: 'app-brand-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './brand-form.html',
  styleUrls: ['./brand-form.css']
})
export class BrandForm {
  brandName = '';
  isEdit = false;

  private router = inject(Router);
  private brandService = inject(BrandService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    // Check if we are editing an existing brand
    const brandId = this.route.snapshot.paramMap.get('id');
    if (brandId) {
      this.isEdit = true;
      this.brandService.getBrandById(brandId).subscribe({
        next: (brand) => {
          this.brandName = brand.name;
        },
        error: (err) => {
          console.error('Error fetching brand:', err);
        }
    });
    }
  }

  submitForm() {
    if (!this.brandName.trim()) return;

    this.brandService.addBrand(this.brandName).subscribe({
      next: () => {
        alert('Brand added successfully!');
        this.router.navigate(['/admin/brands']);
      },
      error: (err) => {
        console.error('Error adding brand:', err);
        alert('Something went wrong!');
      }
    });
  }
  updateBrand() {
    if (!this.brandName.trim()) return;

    const brandId = this.route.snapshot.paramMap.get('id');
    console.log(brandId);
    console.log(this.brandName);
    if (brandId) {
      this.brandService.updateBrand(brandId, this.brandName).subscribe({
        next: () => {
          alert('Brand updated successfully!');
          this.router.navigate(['/admin/brands']);
        },
        error: (err) => {
          console.error('Error updating brand:', err);
          alert('Something went wrong!');
        }
      });
    }
  }
}