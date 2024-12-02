import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // <-- Import MatSnackBar
import { FormsModule } from '@angular/forms';  // <-- Add this for ngModel
import { CommonModule } from '@angular/common';  // <-- Add this for *ngIf
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [FormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    firstname: '',
    lastname: '',
    mail: '',
    job: '',
    password: '', // Optional: allow the user to update their password
    confirmPassword: '',
  };
  errorMessage: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar // <-- Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Load the user's profile data from the backend
  loadUserProfile() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.http.get<any>('http://localhost:8080/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (response) => {
          this.user = response; // Assuming the backend returns the user data
          this.user.password = '';
          this.user.confirmPassword = '';
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
    this.errorMessage = null;

    // Validation regex for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if all required fields are filled
    if (!this.user.firstname || !this.user.lastname || !this.user.mail || !this.user.job) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    // Validate email format
    if (!emailRegex.test(this.user.mail)) {
      this.errorMessage = 'Invalid email format.';
      return;
    }

    // Check password conditions only if a password is provided
    if (this.user.password || this.user.confirmPassword) {
      // Passwords must match
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      // Password must be at least 8 characters long
      if (this.user.password.length < 8) {
        this.errorMessage = 'Password must be at least 8 characters long.';
        return;
      }
    }

    // Create a payload object, omitting password fields if they are empty
    const payload: any = {
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      mail: this.user.mail,
      job: this.user.job,
    };

    if (this.user.password) {
      payload.password = this.user.password; // Include password only if provided
    }

    const token = localStorage.getItem('authToken');
    if (token) {
      this.http
        .put<any>('http://localhost:8080/api/auth/profile', payload, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe({
          next: (response) => {
            // Show success message using MatSnackBar
            this.snackBar.open('Profile updated successfully!', 'Close', {
              duration: 3000, // Duration for the snack bar
              panelClass: ['success-snackbar'], // Custom class for styling
            });

            this.user.password = ''; // Reset password field
            this.user.confirmPassword = ''; // Reset confirm password field
            const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;
            const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]') as HTMLInputElement;
            if (passwordInput) passwordInput.value = '';
            if (confirmPasswordInput) confirmPasswordInput.value = '';
          },
          error: (error) => {
            this.errorMessage = 'Failed to update profile.';
            console.error(error);
          },
        });
    }
  }
}
