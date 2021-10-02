import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { AUTH, DASHBOARD, NOTFOUND, USER } from '.';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { LoginComponent } from '../features/auth/login/login.component';

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
  {
    path: USER,
    loadChildren: () => import('../features/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: NOTFOUND,
    component: NotfoundComponent,
  }
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
