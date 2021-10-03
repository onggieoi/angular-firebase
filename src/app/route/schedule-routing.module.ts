import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from '../features/schedule/schedule.component';
import { ScheduleFormComponent } from '../features/schedule/schedule-form/schedule-form.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
  },
  {
    path: 'add',
    component: ScheduleFormComponent,
  },
  {
    path: 'edit/:id',
    component: ScheduleFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
