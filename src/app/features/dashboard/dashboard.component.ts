import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import firebase from 'firebase/compat';

import { PostService } from 'src/app/services/post.service';
import Task from 'src/app/types/TaskType';
import { TaskService } from 'src/app/services/task.service';
import { taskFilter } from 'src/app/shared/helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  todoTasks: Task[] = [];
  inprogressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.taskService.getTasks().subscribe((tasks: Task[]) => {
        const { todoTasks, inprogressTask, doneTasks } = taskFilter(tasks);

        this.todoTasks = todoTasks;
        this.inprogressTasks = inprogressTask;
        this.doneTasks = doneTasks;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.map(sub => sub.unsubscribe());
  }

}
