import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from '../features/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  // {
  //   path: 'create-task',
  //   component: CreateTaskComponent,
  // },
  // {
  //   path: 'edit-task/:id',
  //   component: UpdateTaskComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
