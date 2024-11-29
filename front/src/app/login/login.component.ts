import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';  // <-- Import MatSnackBar
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mail: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar  // <-- Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token && this.isTokenValid(token)) {
      // Redirect to /tasks if user is already logged in
      this.router.navigate(['/tasks']);
    }
  }

  onSubmit() {
    // Reset error message on each attempt
    this.errorMessage = null;

    const loginData = { mail: this.mail, password: this.password };

    this.http.post<{ token: string }>('http://localhost:8080/api/auth/login', loginData).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.token);
        
        // Show success message using MatSnackBar
        this.snackBar.open('Login successful!', 'Close', {
          duration: 3000,  // Duration the snack bar will show
          panelClass: ['success-snackbar'],  // Custom class for styling
        });
        
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        // Set the error message to show to the user
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error(error);
      }
    });
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      return expiry > Date.now() / 1000; // Token has not expired
    } catch (e) {
      return false; // Token is invalid
    }
  }
}
