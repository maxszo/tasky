import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TasksComponent } from './tasks/tasks.component';
import { StatisticComponent } from './statistic/statistic.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard'; // Import the AuthGuard

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'statistic', component: StatisticComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
