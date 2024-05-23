import { Component, inject } from '@angular/core';
import { RouterLink,RouterLinkActive,RouterOutlet } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterOutlet,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService:AuthService = inject(AuthService)
  isLoggedIn: boolean = false;
  private userSubject!: Subscription ;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  
    this.userSubject = this.authService.user.subscribe((user: User) => {
      console.log(user)
      this.isLoggedIn = user ? true : false;
    });
  
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSubject.unsubscribe();
  }
}
