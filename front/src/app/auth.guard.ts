import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('authToken');

    if (token && this.isTokenValid(token)) {
      return true; // Allow access
    }

    // Redirect to login if token is missing or invalid
    this.router.navigate(['/login']);
    return false;
  }

  // Simple token validation (can be improved to check expiration, structure, etc.)
  private isTokenValid(token: string): boolean {
    // Example: Check if the token exists and matches a specific format
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      return expiry > Date.now() / 1000; // Token has not expired
    } catch (e) {
      return false; // Token is invalid
    }
  }
}
