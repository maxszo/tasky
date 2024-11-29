import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // <-- Import MatSnackBar
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatOptionModule,
  ],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData = {
    firstname: '',
    lastname: '',
    mail: '',
    password: '',
    confirmPassword: '',
    job: '',
  };
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar // <-- Inject MatSnackBar
  ) {}

  onSignup() {
    // Reset error message
    this.errorMessage = null;

    // Check if all fields are filled
    if (
      !this.signupData.firstname ||
      !this.signupData.lastname ||
      !this.signupData.mail ||
      !this.signupData.password ||
      !this.signupData.confirmPassword ||
      !this.signupData.job
    ) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.signupData.mail)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    // Check password length
    if (this.signupData.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      return;
    }

    // Check password confirmation
    if (this.signupData.password !== this.signupData.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Send signup request
    this.isLoading = true;
    this.http.post('http://localhost:8080/api/users', this.signupData).subscribe({
      next: () => {
        // Show success message using MatSnackBar
        this.snackBar.open('Account successfully created!', 'Close', {
          duration: 3000, // Duration for the snack bar
          panelClass: ['success-snackbar'], // Custom class for styling
        });

        // Redirect to login page
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Sign-up failed. Please try again.';
        console.error(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
