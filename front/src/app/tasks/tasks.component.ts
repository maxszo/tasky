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
  showUpdateForm: boolean = false; // For showing the update form
  users: any[] = [];
  selectedUser: any = null; // Store selected user for filtering
  selectedPriority: string = 'ALL'; // Store selected priority for filtering

  newTask = {
    name: '',
    userStoryNumber: '',
    description: '',
    priority: 'MEDIUM',
    state: 'TO_DO',
    users: null,
  };

  taskToUpdate: any = { // Store task to update
    id: null,
    name: '',
    userStoryNumber: '',
    description: '',
    priority: 'MEDIUM',
    state: 'TO_DO',
    users: null,
  };

  constructor(
    private tasksService: TasksService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
    this.fetchUsers();
  }

  fetchTasks() {
    this.tasksService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.applyFilters(); // Apply filters after fetching tasks
    });
  }

  fetchUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  applyFilters() {
    // Filter tasks based on selected user and priority
    this.todoTasks = this.tasks.filter((task) => task.state === 'TO_DO');
    this.inProgressTasks = this.tasks.filter((task) => task.state === 'IN_PROGRESS');
    this.doneTasks = this.tasks.filter((task) => task.state === 'DONE');

    if (this.selectedUser) {
      this.todoTasks = this.todoTasks.filter((task) => task.users && task.users.id === this.selectedUser.id);
      this.inProgressTasks = this.inProgressTasks.filter((task) => task.users && task.users.id === this.selectedUser.id);
      this.doneTasks = this.doneTasks.filter((task) => task.users && task.users.id === this.selectedUser.id);
    }

    if (this.selectedPriority !== 'ALL') {
      this.todoTasks = this.todoTasks.filter((task) => task.priority === this.selectedPriority);
      this.inProgressTasks = this.inProgressTasks.filter((task) => task.priority === this.selectedPriority);
      this.doneTasks = this.doneTasks.filter((task) => task.priority === this.selectedPriority);
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  createTask() {
    this.tasksService.createTask(this.newTask).subscribe(() => {
      this.fetchTasks();
      this.toggleForm();
      this.resetForm();
    });
  }

  resetForm() {
    this.newTask = {
      name: '',
      userStoryNumber: '',
      description: '',
      priority: 'MEDIUM',
      state: 'TO_DO',
      users: null,
    };
  }

  deleteTask(taskId: number) {
    this.tasksService.deleteTask(taskId).subscribe(() => {
      this.fetchTasks();
    });
  }

  // Show the update form with existing task details
  showUpdateFormModal(task: any) {
    this.showUpdateForm = true;
    this.taskToUpdate = { ...task }; // Clone task to avoid direct modification
  }

  updateTask() {
    this.tasksService.updateTask(this.taskToUpdate.id, this.taskToUpdate).subscribe(() => {
      this.fetchTasks(); // Refresh tasks after update
      this.showUpdateForm = false; // Close the update form
    });
  }

  cancelUpdate() {
    this.showUpdateForm = false; // Close the update form without saving
  }

  onUserChange() {
    this.applyFilters(); // Apply filters when user changes
  }

  onPriorityChange() {
    this.applyFilters(); // Apply filters when priority changes
  }
}
