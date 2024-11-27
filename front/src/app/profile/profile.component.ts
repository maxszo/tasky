import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // <-- Add this for ngModel
import { CommonModule } from '@angular/common';  // <-- Add this for *ngIf

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    firstname: '',
    lastname: '',
    mail: '',
    password: '', // Optional: allow the user to update their password
  };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Load the user's profile data from the backend
  loadUserProfile() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.http.get<any>('http://localhost:8080/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (response) => {
          this.user = response; // Assuming the backend returns the user data
        },
        error: (error) => {
          this.errorMessage = 'Failed to load user data.';
          console.error(error);
        }
      });
    }
  }

  // Handle form submission to update the user's profile
  onSubmit() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.http.put<any>('http://localhost:8080/api/users/profile', this.user, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (response) => {
          this.successMessage = 'Profile updated successfully!';
        },
        error: (error) => {
          this.errorMessage = 'Failed to update profile.';
          console.error(error);
        }
      });
    }
  }
}
