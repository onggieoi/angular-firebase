import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Task from 'src/app/types/TaskType';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input()
  task!: Task;

  panelOpenState = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  editTask(id: number | string): void {
    this.router.navigateByUrl(`/edit-task/${id}`).then();
  }

}
