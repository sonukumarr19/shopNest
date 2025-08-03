import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category-service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-form.html',
  styleUrls: ['./category-form.css']
})
export class CategoryForm {
  categoryName = '';
  isEdit = false;

  // Use Angular's `inject()` for standalone-style injection
  private router = inject(Router);
  private categoryService = inject(CategoryService);
  // to find params
  private route = inject(ActivatedRoute);
  ngOnInit() {
    // Check if we are editing an existing category
    const categoryId = this.route.snapshot.paramMap.get('id');
    this.isEdit = true;
    if (categoryId) {
      this.categoryService.getCategoryById(categoryId).subscribe({
        next: (category) => {
          this.categoryName = category.name;
        },
        error: (err) => {
          console.error('Error fetching category:', err);
        }
    });
    }
  }

  submitForm() {
    if (!this.categoryName.trim()) return;

    this.categoryService.addCategory(this.categoryName).subscribe({
      next: () => {
        alert('Category added successfully!');
        this.router.navigate(['/admin/categories']);
      },
      error: (err) => {
        console.error('Error adding category:', err);
        alert('Something went wrong!');
      }
    });
  }
  updateCategory() {
    if (!this.categoryName.trim()) return;

    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.categoryService.updateCategory(categoryId, this.categoryName).subscribe({
        next: () => {
          alert('Category updated successfully!');
          this.router.navigate(['/admin/categories']);
        },
        error: (err) => {
          console.error('Error updating category:', err);
          alert('Something went wrong!');
        }
      });
    }
  }
}