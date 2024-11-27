import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';  // <-- Add this for *ngIf

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed `styleUrl` typo to `styleUrls`
})
export class AppComponent {
  title = 'front';
  showNavbar: boolean = true;

  constructor(private router: Router) {
    // Subscribe to route changes to toggle the navbar
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = ['/login', '/signup'];
        this.showNavbar = !hiddenRoutes.includes(event.url);
      }
    });
  }
}
