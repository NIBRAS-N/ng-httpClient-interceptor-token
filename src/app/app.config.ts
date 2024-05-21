import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { routes } from './app.routes';
import { HttpInterceptor,HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './service/auth.interceptor';
import { loggingInterceptor } from './service/logging.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // {provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true},
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(withInterceptors([loggingInterceptor])),

  ],
};
