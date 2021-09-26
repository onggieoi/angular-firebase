import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Task, { TASK_TYPE } from 'src/app/types/TaskType';

@Component({
  selector: 'app-task-queue',
  templateUrl: './task-queue.component.html',
  styleUrls: ['./task-queue.component.scss']
})
export class TaskQueueComponent implements OnInit {
  @Input() type: TASK_TYPE = 'TODO';
  @Input() tasks: Task[] = [];
  metadata: MetadataType;

  constructor(
    private router: Router,
  ) {
    this.metadata = {
      title: '',
      backgroundColor: '',
      icon: '',
    }
  }

  ngOnInit(): void {
    this.metadata = getMetaData(this.type);
  }

  addTask() {
    this.router.navigateByUrl('/create-task').then();
  }

}

function getMetaData(type: TASK_TYPE): MetadataType {
  if (type === 'TODO') {
    return {
      title: 'New Tasks',
      backgroundColor: '#B2B1B9',
      icon: 'assignment',
    };
  } else if (type === 'INPROGRESS') {
    return {
      title: 'Tasks in progress',
      backgroundColor: '#7DEDFF',
      icon: 'assignment_ind'
    };
  } else {
    return {
      title: 'Tasks get done',
      backgroundColor: '#50CB93',
      icon: 'assignment_turned_in'
    };
  }
}

type MetadataType = {
  title: string,
  backgroundColor: string,
  icon: string,
}
