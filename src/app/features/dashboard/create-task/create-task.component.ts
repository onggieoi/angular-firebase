import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private router: Router,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup) {
    this.loadingService.on();

    setTimeout(() => {
      this.taskService.addTask(form.value, (): void => {
        this.router.navigateByUrl('/');
        this.loadingService.off();
      });
    }, 500);
  }
}
