import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // <-- Add this for ngModel
import { CommonModule } from '@angular/common';  // <-- Add this for *ngIf

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData = {
    firstname: '',
    lastname: '',
    mail: '',
    password: '',
    job: '',
  };
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSignup() {
    if (!this.signupData.job) {
      this.errorMessage = 'Please select a job.';
      return;
    }

    this.http.post('http://localhost:8080/api/users', this.signupData).subscribe({
      next: () => {
        alert('Sign-up successful!');
        this.router.navigate(['/login']); // Redirect to login after success
      },
      error: (error) => {
        this.errorMessage = 'Sign-up failed. Please try again.';
        console.error(error);
      }
    });
  }
}
