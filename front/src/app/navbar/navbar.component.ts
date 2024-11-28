import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [MatToolbarModule, MatButtonModule, MatIconModule]
})
export class NavbarComponent {
  constructor(private router: Router) {}

  onLogout() {
    localStorage.removeItem('authToken'); // Clear token
    alert('You have been logged out.');
    this.router.navigate(['/login']); // Redirect to login
  }

  goToProgress() {
    this.router.navigate(['/tasks']); // Redirect to login
  }
}
