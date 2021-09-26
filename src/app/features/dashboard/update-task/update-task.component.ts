import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import Task from 'src/app/types/TaskType';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  task: Task;
  sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
  ) {
    this.task = {
      id: '',
      title: '',
      description: '',
      status: 'TODO',
    };
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const taskId = routeParams.get('id');
    if (taskId) {
      console.log(taskId);

      this.sub.add(
        this.taskService.getTask(taskId).subscribe(task => {
          console.log(task);

          this.task = task;
        })
      );
    }
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    this.taskService.updateTask(this.task.id, form.value, (): void => {
      console.log('callin back');

      this.router.navigateByUrl('/');
    });
  }
}
