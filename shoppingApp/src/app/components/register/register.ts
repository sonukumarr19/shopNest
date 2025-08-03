import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  authService = inject(AuthService);

  // Separate fields for first and last name
  firstName: string = '';
  lastName: string = '';

  // Form data
  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  };

  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;

  resetForms() {
    this.registerData = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    };
    this.firstName = '';
    this.lastName = '';
  }

  setName(firstName: string, lastName: string) {
    this.registerData.name = `${firstName.trim()} ${lastName.trim()}`.trim();
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  router = inject(Router);
  onRegister() {
    this.setName(this.firstName, this.lastName);

    if (!this.registerData.agreeToTerms) {
      alert('Please agree to the terms and conditions before registering.');
      return;
    }

    if (!this.registerData.email || !this.registerData.password || !this.registerData.name) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!this.passwordsMatch()) {
      alert('Passwords do not match.');
      return;
    }

    if (!this.isValidEmail(this.registerData.email)) {
      alert('Invalid email format.');
      return;
    }

    this.isLoading = true;

    this.authService.register(
      this.registerData.name,
      this.registerData.email,
      this.registerData.password
    ).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        alert('Registration successful! Please check your email.');
        this.resetForms();
        this.router.navigateByUrl('/login'); // Redirect to login page after successful registration
      },
      error: (error) => {
        console.error('Registration failed:', error);
        alert(error?.error?.message || 'Registration failed. Please try again.');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  getPasswordStrength(password: string): string {
    if (password.length === 0) return '';
    if (password.length < 6) return 'weak';
    if (password.length < 8) return 'medium';
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)) {
      return 'strong';
    }
    return 'medium';
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  passwordsMatch(): boolean {
    return this.registerData.password === this.registerData.confirmPassword;
  }

  // Optional: social login stubs
  onGoogleLogin() {
    console.log('Google login clicked');
  }

  onFacebookLogin() {
    console.log('Facebook login clicked');
  }

  onTwitterLogin() {
    console.log('Twitter login clicked');
  }
}
