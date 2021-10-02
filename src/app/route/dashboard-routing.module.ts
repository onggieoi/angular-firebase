import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateTaskComponent } from '../features/dashboard/create-task/create-task.component';
import { DashboardComponent } from '../features/dashboard/dashboard.component';
import { UpdateTaskComponent } from '../features/dashboard/update-task/update-task.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'create-task',
    component: CreateTaskComponent,
  },
  {
    path: 'edit-task/:id',
    component: UpdateTaskComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
