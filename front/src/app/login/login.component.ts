import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // <-- Add this for ngModel
import { CommonModule } from '@angular/common';  // <-- Add this for *ngIf

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mail: string = '';
  password: string = '';
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    const loginData = { mail: this.mail, password: this.password };

    this.http.post<{ token: string }>('http://localhost:8080/api/auth/login', loginData).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.token); // Stocker le token
        alert('Login successful!');
        this.router.navigate(['/tasks']); // Rediriger vers la page des tâches
      },
      error: (error) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
