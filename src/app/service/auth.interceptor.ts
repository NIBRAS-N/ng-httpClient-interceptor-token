import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { exhaustMap, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { inject,Injectable } from '@angular/core';
import { take } from 'rxjs';
export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const authService = inject(AuthService);
    console.log('Auth Interceptor called!');

    return authService.user.pipe(take(1), exhaustMap((user) => {
        if(!user){
            return next(req);
        }
        const modifiedReq = req.clone({
            params: new HttpParams().set('auth', user.token!)})
        console.log("from auth interceptor ",modifiedReq);   
        // console.log("from auth interceptor ",user.token);   
        return next(modifiedReq)
    }));
    //take(1)= receive prev emit data -> unsbscribe obsevable -> return observable
  
    // const modifiedReq = req.clone()
    //{headers: req.headers.append('auth', 'abcxyz')}
    // return next(modifiedReq).pipe(tap((event) => {  
    //     if(event.type === HttpEventType.Response){
    //         console.log(event.type);
    //         console.log('Response has arrived. Response data: ');
    //         console.log(event.body)
    //     }
    // }));
  
    
};
