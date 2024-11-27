import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  onLogout() {
    localStorage.removeItem('authToken'); // Clear token
    alert('You have been logged out.');
    this.router.navigate(['/login']); // Redirect to login
  }
}
