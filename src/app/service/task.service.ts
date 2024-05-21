import { Injectable,inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Task } from '../model/task';
import { catchError, map, Subject, throwError } from 'rxjs';
import { LogErrorService } from './log-error.service';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  http = inject(HttpClient);
  ErrorService = inject(LogErrorService);
  errorSubject  = new Subject<HttpErrorResponse>();
  constructor() { }
  
  createTask(data:Task){
    const headers = new HttpHeaders({'my-header':'hello-world'});
    // console.log(data);
    return this.http.post<{name:string}>("https://angularhttpclient-27d32-default-rtdb.firebaseio.com/tasks.json",data,{headers: headers})
      .pipe(
        catchError((err)=>{
          const obj = {statusCode:err.status,errorMessage:err.message,datetime:new Date(),from:"task.Service||createTask()"};
          this.ErrorService.logError(obj);
          return throwError(()=>err);
        }
        )
      )
    
  }

  // fetchAllTaskClicked(){
  //   return this.fetchAllData()
  // }
   fetchAllData(){
    let header = new HttpHeaders();
    // header = header.set('content-type','application/json')
    // header = header.set('content-type','text/html')
    // header = header.append('Access-Control-Allow-Origin','*')
    header = header.append('content-type','application/json')
    header = header.append('content-type','text/html')

    return  this.http.get<{[key:string]:Task}>(
      "https://angularhttpclient-27d32-default-rtdb.firebaseio.com/tasks.json",{headers:header}
    ).pipe(map((res)=>{
        let task=[];
        for(let i in res){
          if(res.hasOwnProperty(i))
            task.push({...res[i],id:i})
        }
        return task;
      }),catchError((err)=>{
        const obj = {statusCode:err.status,errorMessage:err.message,datetime:new Date(),from:"task.Service||fetchAllData()"};
        this.ErrorService.logError(obj);
        return throwError(()=>err);
      })
    )
  }

  onDelete(id:string|undefined){
    this.http.delete("https://angularhttpclient-27d32-default-rtdbsss.firebaseio.com/tasks/"+id+'.json' )
    .pipe(
      catchError((err)=>{
        const obj = {statusCode:err.status,errorMessage:err.message,datetime:new Date(),from:"task.Service||onDelete()"};
        this.ErrorService.logError(obj);
        return throwError(()=>err);
      }
      )
    )
    .subscribe({error:(res)=>{console.log(res);this.errorSubject.next(res)}});
    
    
  }

  DeleteAllTask(){
  
      return this.http.delete("https://angularhttpclient-27d32-default-rtdb.firebaseio.com/tasks.json")
      .pipe(
        catchError((err)=>{
          const obj = {statusCode:err.status,errorMessage:err.message,datetime:new Date(),from:"task.Service||DeleteAllTask()"};
          this.ErrorService.logError(obj);
          return throwError(()=>err);
        }
        )
      )
      
    

  }

  UpdateTask(id:string|undefined,data:Task){
    return this.http.put("https://angularhttpclient-27d32-default-rtdb.firebaseio.com/tasks/"+id+".json",data)
    .pipe(
      catchError((err)=>{
        const obj = {statusCode:err.status,errorMessage:err.message,datetime:new Date(),from:"task.Service||updateTask()"};
        this.ErrorService.logError(obj);
        return throwError(()=>err);
      }
      )
    )
  }
}
