import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    this.taskService.addTask(form.value, (): void => {
      console.log('callin back');

      this.router.navigateByUrl('/');
    });
  }
}
