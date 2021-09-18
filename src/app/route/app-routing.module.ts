import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { AUTH, DASHBOARD } from '.';

const routes: Routes = [
  {
    path: AUTH,
    loadChildren: () => import('../features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: DASHBOARD,
    loadChildren: () => import('../features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
