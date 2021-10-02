import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoutingModule } from '../../route/user-routing.module';
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
  ],
})
export class UserModule { }
