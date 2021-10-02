import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

import { TaskService } from 'src/app/services/task.service';
import Task from 'src/app/types/TaskType';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit, OnDestroy {
  task: Task;
  sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private loadingService: LoadingService,
  ) {
    this.task = {
      id: '',
      title: '',
      description: '',
      status: 'TODO',
    };
  }

  ngOnInit(): void {
    this.loadingService.on();

    const routeParams = this.route.snapshot.paramMap;
    const taskId = routeParams.get('id');
    if (taskId) {
      this.sub.add(
        this.taskService.getTask(taskId).subscribe(task => {
          if (task) {
            this.task = task;
            this.loadingService.off();
          } else {
            this.router.navigateByUrl('/404');
          }
        }),
      );
    }
  }

  onSubmit(form: FormGroup) {
    this.loadingService.on();

    setTimeout(() => {
      this.taskService.updateTask(this.task.id, form.value, (): void => {
        this.router.navigateByUrl('/');
        this.loadingService.off();
      });
    }, 300);
  }

  onDelete() {
    this.loadingService.on();

    setTimeout(() => {
      this.taskService.deleteTask(this.task.id, () => {
        this.router.navigateByUrl('/');
        this.loadingService.off();
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
