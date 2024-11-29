import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../tasks.service';
import { UserService } from '../users.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component'; // Import dialog component
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

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
    private dialog: MatDialog // Add MatDialog
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
        });
      }
    });
  }

  deleteTask(taskId: number) {
    this.tasksService.deleteTask(taskId).subscribe(() => {
      this.fetchTasks();
    });
  }

  onUserChange() {
    this.applyFilters();
  }

  onPriorityChange() {
    this.applyFilters();
  }
}
