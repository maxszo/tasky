import { Component, Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule],
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent implements OnInit {
  errorMessage: string | null = null;


  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // Ensure the assigned user is correctly prefilled in the update dialog
    if (this.data.task.users) {
      const assignedUser = this.data.users.find(
        (user: any) => user.id === this.data.task.users.id
      );
      this.data.task.users = assignedUser || null;
    }
  }

  onSave() {
    // Reset error message
    this.errorMessage = null;

    // Validate that required fields are not empty
    if (
      !this.data.task.name ||
      !this.data.task.userStoryNumber ||
      !this.data.task.description ||
      !this.data.task.priority ||
      !this.data.task.state
    ) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.dialogRef.close(this.data.task);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
