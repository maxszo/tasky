// tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { UserService } from '../users.service';
import { CommonModule } from '@angular/common';  
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: any[] = []; 
  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  doneTasks: any[] = [];
  showForm: boolean = false;
  users: any[] = [];  // Store users for the dropdown

  newTask = {
    name: '',
    userStoryNumber: '',
    description: '',
    priority: 'MEDIUM',  // Default to medium priority
    state: 'TO_DO',
    users: null,  // User to assign
  };

  constructor(
    private tasksService: TasksService,
    private userService: UserService  // Inject UserService
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
    this.fetchUsers();  // Fetch users for the dropdown
  }

  fetchTasks() {
    this.tasksService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.todoTasks = this.tasks.filter((task) => task.state === 'TO_DO');
      this.inProgressTasks = this.tasks.filter((task) => task.state === 'IN_PROGRESS');
      this.doneTasks = this.tasks.filter((task) => task.state === 'DONE');
    });
  }

  fetchUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  createTask() {
    this.tasksService.createTask(this.newTask).subscribe(() => {
      this.fetchTasks(); // Refresh tasks after creation
      this.toggleForm(); // Hide form
      this.resetForm(); // Clear form fields
    });
  }

  resetForm() {
    this.newTask = {
      name: '',
      userStoryNumber: '',
      description: '',
      priority: 'MEDIUM', // Reset to default priority
      state: 'TO_DO',
      users: null,
    };
  }
}
