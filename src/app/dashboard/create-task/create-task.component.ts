import { Component, EventEmitter, Output,Input, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../model/task';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent  {
  @Output() CloseForm:EventEmitter<boolean> = new EventEmitter<boolean>() ;
  @Output() TaskSubmit:EventEmitter<Task> = new EventEmitter<Task>();
  @Input() selectedItem!:Task;
  @Input() isEditMode:boolean = false;

  //2nd way
  @ViewChild('taskForm') taskForm! :NgForm
  
  OnCloseForm(){
    this.CloseForm.emit(false);
  }
  onSubmit(form:NgForm){
    this.TaskSubmit.emit(form.value);
    // console.log("hell ",form.value);
    this.CloseForm.emit(false);
  }

  ngAfterViewInit(): void {
    console.log(this.selectedItem);
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // this.isEditMode=true;
    setTimeout(() => {
      
      this.taskForm.form.patchValue(this.selectedItem  )
    }, 500);
  }
  

}
