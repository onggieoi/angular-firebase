import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { FormTaskComponent } from './form-task/form-task.component';
import { TaskComponent } from './task/task.component';
import { TaskQueueComponent } from './task-queue/task-queue.component';
import { DashboardRoutingModule } from 'src/app/route/dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    TaskComponent,
    TaskQueueComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    FormTaskComponent,
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
  ],
})
export class DashboardModule { }
