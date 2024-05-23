import { Component,inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateTaskComponent } from './create-task/create-task.component';
import { Task } from '../model/task';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../service/task.service';
import { Subject,Subscription,map } from 'rxjs';
import {NgClass} from '@angular/common';
import { HttpClientModule  } from '@angular/common/http';
import { LogErrorService } from '../service/log-error.service';
import { TaskDetailsComponent } from './task-details/task-details.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CreateTaskComponent,FormsModule,HttpClientModule ,NgClass,TaskDetailsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  showCreateTaskForm:boolean = false;
  selectedItem : Task = new Task()
  service : TaskService = inject(TaskService);
  isEditMode: boolean = false;
  allTasks: Task[] = [];
  selectedItemId : string = ""
  isLoading:boolean = false;
  errorMessage: string | null = null;
  errorSub : Subscription = new Subscription() ;
  logService:LogErrorService = inject(LogErrorService);

  showTaskDetail:boolean=false

  ngOnInit(): void {
      this.fetchAllData()
      this.errorSub = this.service.errorSubject.subscribe({next:(res)=>{this.setErrorMessage(res)}})
  }

  
  CloseShowTaskDetail(){this.showTaskDetail=false}
  OpenShowTaskDetail(){this.showTaskDetail=true}
  CloseCreateTaskForm(){
    debugger;
    this.showCreateTaskForm=false;
  }
  OpenCreateTaskForm(){
    this.showCreateTaskForm=true;
    this.isEditMode=false;
    this.selectedItem= {title: '', desc: '', assignedTo: '', createdAt: '', priority: '', status: ''} 
  }

  createAndUpdateTask(data:Task){
    // debugger;
    this.isLoading=true;
    if(this.isEditMode==false)
      this.service.createTask(data).subscribe(
        {
          next:(res)=>{console.log(res);this.fetchAllData()},
          error:(err)=>{this.isLoading=false; this.setErrorMessage(err)}
      
        }
    
      );
    else this.service.UpdateTask(this.selectedItemId,data).subscribe(
      {
        next:(res)=>{console.log(res);this.fetchAllData()},
        error:(err)=>{this.isLoading=false; this.setErrorMessage(err)}
      
      }
    );
    // else console.log(this.selectedItemId);
  }

  private setErrorMessage(err: HttpErrorResponse){
    if(err.error.error === 'Permission denied'){
      this.errorMessage = 'You do not have permisssion to perform this action';
    }
    else{
      this.errorMessage = err.message;
    }

    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }


  fetchAllTaskClicked(){
    // this.service.fetchAllTaskClicked().subscribe((res)=>{

    //   this.allTasks = res;
    //   // this.ngOnInit();
    //   // this.fetchAllData();
    // });
    this.fetchAllData();
  }
  private fetchAllData(){
    this.isLoading = true;
    this.service.fetchAllData().subscribe({
      next:(res)=>{

        this.allTasks = res;
        // this.ngOnInit();
        // this.fetchAllData();
        this.isLoading = false;
      },
      error:(err)=>{this.isLoading=false; this.setErrorMessage(err)}
  });
  }

  onDelete(id:string|undefined){
    this.service.onDelete(id)
    setTimeout(() => {
      
      this.fetchAllData();  
    }, 1000);
  }

  DeleteAllTask(){
    let cnf = confirm("You want to delete all task?");
    if(cnf){
      this.service.DeleteAllTask().subscribe(res=>{this.fetchAllData()});
    }
  }
  SelectTask1(item:Task){
    // debugger;
    this.selectedItem=(item as Task);
    this.isEditMode = true;
    this.showCreateTaskForm = true;
    // this.OpenShowTaskDetail();
    this.selectedItemId= item.id!;
    // this.isEditMode = false;
  }
  SelectTask2(item:Task){
    // debugger;
    this.selectedItem=(item as Task);
    // this.isEditMode = true;
    // this.OpenCreateTaskForm()
    this.OpenShowTaskDetail();
    
    this.selectedItemId= item.id!;
  }





  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.errorSub.unsubscribe()
  }
}
