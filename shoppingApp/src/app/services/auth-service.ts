import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
    id: string;
    email: string;
    isAdmin: boolean;
    exp: number;   // expiry timestamp
    iat: number;   // issued at timestamp
  }

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  http = inject(HttpClient);
 

  register(name:string , email:string , password:string){
    return this.http.post('https://shopnest-wgn8.onrender.com' + '/auth/register',{
      name,
      email,
      password
    })
  }

  loginUser(email: string, password: string) {
    return this.http.post('https://shopnest-wgn8.onrender.com' + '/auth/login', {
      email,
      password
    });
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  get isAdmin(): boolean {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if(user.isAdmin) {
        return true;
    }
  }
    // console.error('User is not admin or user data is missing');
    return false;
  }

  get userName() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.name || 'Guest';
    }
    return 'Guest';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    const token = this.getToken();
    console.log('AuthService - getUserId - token:', token);
    if (!token) return null;

    try {
      const decoded = jwtDecode<JWTPayload>(token);
      console.log('Decoded JWT payload:', decoded);
      return decoded.id;
    } catch (e) {
      console.error('Invalid token:', e);
      return null;
    }
  }
}



import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';

 