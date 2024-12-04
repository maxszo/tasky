import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { TasksService } from '../tasks.service';
import { UserService } from '../users.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component'; // Import Task dialog component
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'; // Import confirmation dialog component
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBarModule
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatSnackBarModule,
    CdkDropListGroup, 
    CdkDropList, 
    CdkDrag,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  doneTasks: any[] = [];
  users: any[] = [];
  selectedUser: any = null;
  selectedPriority: string = 'ALL';

  constructor(
    private tasksService: TasksService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar // Add MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
    this.fetchUsers();
  }

  fetchTasks() {
    this.tasksService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.applyFilters();
    });
  }

  fetchUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  applyFilters() {
    this.todoTasks = this.tasks.filter((task) => task.state === 'TO_DO');
    this.inProgressTasks = this.tasks.filter(
      (task) => task.state === 'IN_PROGRESS'
    );
    this.doneTasks = this.tasks.filter((task) => task.state === 'DONE');

    if (this.selectedUser) {
      this.todoTasks = this.todoTasks.filter(
        (task) => task.users && task.users.id === this.selectedUser.id
      );
      this.inProgressTasks = this.inProgressTasks.filter(
        (task) => task.users && task.users.id === this.selectedUser.id
      );
      this.doneTasks = this.doneTasks.filter(
        (task) => task.users && task.users.id === this.selectedUser.id
      );
    }

    if (this.selectedPriority !== 'ALL') {
      this.todoTasks = this.todoTasks.filter(
        (task) => task.priority === this.selectedPriority
      );
      this.inProgressTasks = this.inProgressTasks.filter(
        (task) => task.priority === this.selectedPriority
      );
      this.doneTasks = this.doneTasks.filter(
        (task) => task.priority === this.selectedPriority
      );
    }
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: {
        task: {
          name: '',
          userStoryNumber: '',
          description: '',
          priority: 'HIGH', // Default priority
          state: 'TO_DO', // Default state
          users: null, // Default to no user
        },
        users: this.users, // Pass the list of users to the dialog
        title: 'Create Task',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasksService.createTask(result).subscribe(() => {
          this.fetchTasks(); // Refresh tasks after creation
          this.snackBar.open('Task created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        });
      }
    });
  }

  openUpdateDialog(task: any) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: {
        task: { ...task }, // Pass a copy of the task for editing
        users: this.users, // Pass the list of users to the dialog
        title: 'Update Task',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasksService.updateTask(result.id, result).subscribe(() => {
          this.fetchTasks(); // Refresh tasks after update
          this.snackBar.open('Task updated successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        });
      }
    });
  }

  deleteTask(taskId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Delete Task Confirmation',
        message: 'Are you sure you want to delete this task?',
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.tasksService.deleteTask(taskId).subscribe(() => {
          this.fetchTasks(); // Refresh tasks after deletion
          this.snackBar.open('Task deleted successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        });
      }
    });
  }

  onUserChange() {
    this.applyFilters();
  }

  onPriorityChange() {
    this.applyFilters();
  }

  getColumnState(columnId: string): string {
    switch (columnId) {
      case 'todo-column': return 'TO_DO';
      case 'in-progress-column': return 'IN_PROGRESS';
      case 'done-column': return 'DONE';
      default: return '';
    }
  }
  

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex]; // Get the moved task
      const newState = this.getColumnState(event.container.id); // Determine the new state based on the container
  
      if (task.state !== newState) {
        task.state = newState; // Update the task's state locally
        this.tasksService.updateTask(task.id, task).subscribe(() => {
          this.snackBar.open('Task updated successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          this.fetchTasks(); // Refresh tasks after update
        });
      }
  
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  
}
