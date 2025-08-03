import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';      

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  showForm: boolean = true;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.loginUser(email, password).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials.');
          this.showForm = true;
        }
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

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
