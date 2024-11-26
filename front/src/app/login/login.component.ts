import { Component } from '@angular/core';
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
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;  // Add this line

  constructor(private router: Router) {}

  onSubmit() {
    this.isLoading = true;  // Set loading to true when form is submitted

    // Mock login logic
    setTimeout(() => {
      if (this.username === 'admin' && this.password === 'admin') {
        this.router.navigate(['/tasks']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
      this.isLoading = false;  // Set loading to false after checkingss
    }, 500);  // Mock delay for 2 secondsssffzs
  }
} 