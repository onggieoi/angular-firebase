import { Component, EventEmitter, Input, OnChanges, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { RadioOptionType } from 'src/app/components/form-field/radio-field/radio-field.component';

import Task, { TASK_TYPE } from 'src/app/types/TaskType';

const TaskStatusOptions: RadioOptionType<TASK_TYPE>[] = [
  { label: 'Todo', value: 'TODO' },
  { label: 'Inprogress', value: 'INPROGRESS' },
  { label: 'Done', value: 'DONE' },
];

type SubmitType = 'Create' | 'Update';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss']
})
export class FormTaskComponent implements OnInit, OnChanges {
  @Input() formType?: Task;
  @Output() onSubmit = new EventEmitter<FormGroup>();
  @Output() onDelete = new EventEmitter();

  type: SubmitType = 'Create';
  taskForm: FormGroup;
  taskStatusOptions = TaskStatusOptions;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
  ) {
    this.taskForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('TODO' as TASK_TYPE, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const formType = changes.formType.currentValue;
    if (formType) {
      this.type = 'Update';
      this.taskForm.setValue({
        title: formType.title,
        description: formType.description,
        status: formType.status,
      });
    }
  }

  submit(): void {
    this.onSubmit.emit(this.taskForm);
  }

  onCancel(): void {
    this.location.back();
  }
}
