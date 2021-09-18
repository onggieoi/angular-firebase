import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TaskComponent } from 'src/app/components/task/task.component';
import { TaskQueueComponent } from 'src/app/components/task-queue/task-queue.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormTaskComponent } from './form-task/form-task.component';
import { TextFieldComponent } from 'src/app/components/form-field/text-field/text-field.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TaskComponent,
    TaskQueueComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    FormTaskComponent,
    TextFieldComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule { }
