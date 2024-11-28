import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { CommonModule } from '@angular/common';  // Ajouter CommonModule ici
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, DragDropModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: any[] = []; // Liste des tâches
  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  doneTasks: any[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.tasksService.getTasks().subscribe((data) => {
      this.tasks = data;

      // Filtrer les tâches par état
      this.todoTasks = this.tasks.filter((task) => task.state === 'TO_DO');
      this.inProgressTasks = this.tasks.filter((task) => task.state === 'IN_PROGRESS');
      this.doneTasks = this.tasks.filter((task) => task.state === 'DONE');
    });
  }
}
