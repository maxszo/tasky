import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  public chart: any;
  tasks: any[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.tasksService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.createChart(); // Create the chart once data is loaded
    });
  }

  preprocessData() {
    // Define the type for task states
    type TaskState = 'TO_DO' | 'IN_PROGRESS' | 'DONE';
  
    // Group tasks by user
    const userTaskMap: { [userName: string]: { TO_DO: number; IN_PROGRESS: number; DONE: number } } = {};
  
    this.tasks.forEach((task) => {
      const userName = task.users ? `${task.users.firstname} ${task.users.lastname}` : 'Unassigned';
      
      // Initialize counts for the user if not already present
      if (!userTaskMap[userName]) {
        userTaskMap[userName] = { TO_DO: 0, IN_PROGRESS: 0, DONE: 0 };
      }
  
      // Ensure task.state is one of the valid keys
      const state = task.state as TaskState;
      if (userTaskMap[userName][state] !== undefined) {
        userTaskMap[userName][state] += 1;
      }
    });
  
    return userTaskMap;
  }
  

  createChart() {
    const userTaskMap = this.preprocessData();
    const users = Object.keys(userTaskMap); // X-Axis labels (users)
    const todoCounts = users.map(user => userTaskMap[user].TO_DO);
    const inProgressCounts = users.map(user => userTaskMap[user].IN_PROGRESS);
    const doneCounts = users.map(user => userTaskMap[user].DONE);

    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: users, // Users on the X-Axis
        datasets: [
          {
            label: "TO_DO",
            data: todoCounts,
            backgroundColor: '#F08080', // Light Blue
          },
          {
            label: "IN_PROGRESS",
            data: inProgressCounts,
            backgroundColor: '#D3D3D3', // Light Grey
          },
          {
            label: "DONE",
            data: doneCounts,
            backgroundColor: '#ADD8E6', // Light Coral/Red
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            stacked: false, // Separate bars for each state
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Tasks',
            },
          },
        },
      },
    });
  }
}
