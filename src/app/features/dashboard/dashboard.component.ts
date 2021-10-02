import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import Task from 'src/app/types/TaskType';
import { TaskService } from 'src/app/services/task.service';
import { taskFilter } from 'src/app/shared/helper';
import { LoadingService } from 'src/app/services/loading.service';

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
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.loadingService.on();

    this.subs.push(
      this.taskService.getTasks().subscribe((tasks: Task[]) => {
        const { todoTasks, inprogressTask, doneTasks } = taskFilter(tasks);

        this.todoTasks = todoTasks;
        this.inprogressTasks = inprogressTask;
        this.doneTasks = doneTasks;

        this.loadingService.off();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.map(sub => sub.unsubscribe());
  }

}
