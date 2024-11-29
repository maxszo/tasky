import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';  // <-- Import MatSnackBar
import { MatDialog } from '@angular/material/dialog'; // <-- Import MatDialog here
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'; // Import the global confirmation dialog component
import { MatDialogModule } from '@angular/material/dialog'; // <-- Import MatDialogModule here

@Component({
  selector: 'app-navbar',
  standalone: true, // <-- Mark this component as standalone
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,  // <-- Import MatDialogModule here
  ],
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog // Inject MatDialog to use the global confirmation dialog
  ) {}

  onLogout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Log Out Confirmation',
        message: 'Are you sure you want to log out?',
      },
      autoFocus: false, // Prevent auto-focus on the first button
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        localStorage.removeItem('authToken'); // Clear token
        this.snackBar.open('You have been logged out.', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });

        this.router.navigate(['/login']); // Redirect to login page
      }
    });
  }

  goToProgress() {
    this.router.navigate(['/tasks']);
  }
}
