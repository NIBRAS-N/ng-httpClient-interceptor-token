import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogErrorService {
  http:HttpClient = inject(HttpClient);
  constructor() { }

  logError(data: {statusCode: number, errorMessage: string, datetime: Date,from:string}){
    debugger;
    this.http.post<{name:string}>("https://angularhttpclient-27d32-default-rtdb.firebaseio.com/logError.json",data)
    .subscribe((res)=>console.log("error saved in logError",res))
  }
}
