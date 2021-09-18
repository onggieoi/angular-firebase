import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss']
})
export class FormTaskComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.email]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    console.log(this.taskForm.value);
  }

}
