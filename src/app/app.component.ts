import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './dashboard/create-task/create-task.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './service/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DashboardComponent,CreateTaskComponent,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authService: AuthService = inject(AuthService);
  title = 'angular-http-client';

  ngOnInit(){
    this.authService.autoLogin();
    
  }
}
