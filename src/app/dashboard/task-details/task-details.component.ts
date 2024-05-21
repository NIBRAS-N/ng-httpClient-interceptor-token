import { Component, Input,EventEmitter,Output } from '@angular/core';
import { Task } from '../../model/task';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {
  @Input() currentTask:Task = new Task();
  @Output() closeTaskStatus: EventEmitter<boolean> = new EventEmitter<boolean>() ;
  OnCloseTaskDetail(){
    this.closeTaskStatus.emit(false);
  }
}
