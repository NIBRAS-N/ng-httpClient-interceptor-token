import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { LoaderComponent } from '../utility/loader/loader/loader.component';
import { Observable } from 'rxjs';
import { AuthResponse } from '../model/AuthResponse';
import { Router } from '@angular/router';
import { SnackbarComponent } from '../utility/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,LoaderComponent,SnackbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService : AuthService = inject(AuthService)
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  authObs!: Observable<AuthResponse>;
  errorMessage: string | null = null;
  router: Router = inject(Router);

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmitted(form:NgForm){
    console.log(form.value)
    const email = form.value.email;
    const password = form.value.password;
    
    if(this.isLoginMode){
      this.isLoading = true;
      this.authObs = this.authService.login(email, password);
    }
    else {
      this.isLoading = true;
      this.authObs = this.authService.signup(email, password);
      
    }

    this.authObs.subscribe({
      next: (res) => { 
        console.log(res);
        this.isLoading = false; 
        // this.router.navigate(['/dashboard']);
        // this.authService.autoLogin()
        // this.authService.login(email,password)
      },
      error: (errMsg) => { 
        this.isLoading = false;
        console.log(errMsg)
        this.errorMessage = errMsg;
        this.hideSnackbar();
      }
    })
    form.reset();
  }

  hideSnackbar(){
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }
}
