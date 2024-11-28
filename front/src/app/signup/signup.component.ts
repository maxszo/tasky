import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
    job: '',
  };
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSignup() {
    if (!this.signupData.job) {
      this.errorMessage = 'Please select a job.';
      return;
    }

    this.isLoading = true;
    this.http.post('http://localhost:8080/api/users', this.signupData).subscribe({
      next: () => {
        alert('Sign-up successful!');
        this.router.navigate(['/login']); // Redirect to login after success
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
