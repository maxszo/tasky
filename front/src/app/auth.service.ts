import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Simulate a login request
  login(username: string, password: string): Observable<any> {
    // Mock users (you can change the users here for your mock)
    const mockUsers = [
      { username: 'admin', password: 'admin', token: 'admin-token' },
      { username: 'user', password: 'user', token: 'user-token' }
    ];

    // Check if the username and password match any of the mock users
    const foundUser = mockUsers.find(user => user.username === username && user.password === password);

    if (foundUser) {
      return of({ success: true, token: foundUser.token });
    } else {
      return of({ success: false, message: 'Invalid credentials' });
    }
  }

  // Simulate logout
  logout(): void {
    // Clear the stored token
    localStorage.removeItem('token');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
