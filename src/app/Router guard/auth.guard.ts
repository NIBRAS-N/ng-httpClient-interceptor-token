import { CanActivateFn, UrlTree , Router} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';


export const authGuard: CanActivateFn = (route, state): boolean | UrlTree |Promise<boolean | UrlTree> | Observable<boolean | UrlTree> => {

  const authService:AuthService = inject(AuthService)
  const router = inject(Router);
  
  return authService.user.pipe(map((user)=>{
    const loggedIn =  user ? true : false;

    if(loggedIn){
        return true;
    }else {
        return router.createUrlTree(['/login']);
    }
  
  }))
  // return true;
};
