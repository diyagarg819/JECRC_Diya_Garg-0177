import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  login(username: string, password: string) {
    // In a real application, you would make an HTTP request to your backend here.
    // For this example, we'll just check if the username and password are correct.
    if (username === 'admin' && password === 'admin') {
      this.isLoggedIn = true;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('token','dummy-token');
      }
      return true;
    }
    return false;
  }

  logout(){
    this.isLoggedIn = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }
}
