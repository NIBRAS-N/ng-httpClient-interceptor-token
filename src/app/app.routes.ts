import { Routes } from '@angular/router';
import { CreateTaskComponent } from './dashboard/create-task/create-task.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './Router guard/auth.guard';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"login",component:LoginComponent},
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),canActivate:[authGuard]
    }
    // {path:"dashboard",component:DashboardComponent}
    // {path:"",component:AppComponent}

];
