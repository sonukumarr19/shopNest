import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  register(name:string , email:string , password:string){
    return this.http.post('http://localhost:3000' + '/auth/register',{
      name,
      email,
      password
    })
  }

  loginUser(email: string, password: string) {
    return this.http.post('http://localhost:3000' + '/auth/login', {
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
}



import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';

 