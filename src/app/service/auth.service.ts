import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';

import { Router } from '@angular/router';
import { AuthResponse } from '../model/AuthResponse';
import { catchError,throwError,tap, Subject,BehaviorSubject, mergeMap  } from 'rxjs';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http : HttpClient = inject(HttpClient);
  router:Router = inject(Router)
  user = new BehaviorSubject<User>(null as any);
  private tokenExpiretimer: any;
  constructor() { }

  signup(email:string, password:string){
    const data = {email: email, password: password, returnSecureToken: true};
    return this.http.post<AuthResponse>
        (
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5IVyxdcWepnw2-eUs0-XR_Rd-a8J11qM', 
            data
        ).pipe(
          mergeMap((x)=>{return this.login(x.email,password)}),
           catchError(this.handleError),tap((res)=>{this.handleCreateUser(res)}
          
          ))
  }
  login(email:string, password:string){
    const data = {email: email, password: password, returnSecureToken: true};
    return this.http.post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5IVyxdcWepnw2-eUs0-XR_Rd-a8J11qM',
        data
    ).pipe(catchError(this.handleError),tap((res)=>{this.handleCreateUser(res)}))
  }
  logout(){
    this.user.next(null as any);
    this.router.navigate(['/login']);
    localStorage.removeItem('user');

    if(this.tokenExpiretimer){
        clearTimeout(this.tokenExpiretimer);
    }
    this.tokenExpiretimer = null;
  }
  autoLogout(expireTime: number){
    this.tokenExpiretimer = setTimeout(() => {
        this.logout();
    }, expireTime);
  }

  autoLogin(){
    const user = JSON.parse(localStorage.getItem('user')!);

    if(!user){
        return;
    }

    const loggedUser = new User(user.email, user.id, user._token, user._expiresIn)
    console.log("lol ",loggedUser)
    if(loggedUser.token){
        this.user.next(loggedUser);
        const timerValue = Math.round(user.exp.getTime() - new Date().getTime());
        // console.log("from",timerValue)
        this.autoLogout(timerValue);
        this.router.navigate(['/dashboard']);
    }
  }
  private handleCreateUser(res:AuthResponse){
    const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);
    const user = new User(res.email, res.localId, res.idToken, expiresIn);
    this.user.next(user);
    this.autoLogout(Number(res.expiresIn)  * 1000);

    localStorage.setItem('user', JSON.stringify(user));
    // this.router.navigate(['/dashboard']);
  }
  private handleError(err:any){
    let errorMessage = 'An unknown error has occured'
    console.log(err);
    if(!err.error || !err.error.error){
        return throwError(() => errorMessage);
    }
    switch (err.error.error.message){
        case 'EMAIL_EXISTS':
            errorMessage ="This email already exists.";
            break;
        case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'This operation is not allowed.';
            break;
        case 'INVALID_LOGIN_CREDENTIALS':
            errorMessage = 'The email ID or Password is not correct.';
            break
    }
    return throwError(() => errorMessage);
  }
  
}
