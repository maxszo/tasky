import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mail: string = '';
  password: string = '';
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token && this.isTokenValid(token)) {
      // Redirect to /tasks if user is already logged in
      this.router.navigate(['/tasks']);
    }
  }

  onSubmit() {
    this.isLoading = true; // Show the spinner when submitting the form
    this.errorMessage = null; // Reset the error message

    const loginData = { mail: this.mail, password: this.password };

    this.http.post<{ token: string }>('http://localhost:8080/api/auth/login', loginData).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.token);
        alert('Login successful!');
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error(error);
      },
      complete: () => {
        // Always stop the loading spinner and enable the button
        this.isLoading = false;
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
