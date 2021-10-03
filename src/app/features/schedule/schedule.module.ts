import { NgModule } from '@angular/core';

import { ScheduleComponent } from './schedule.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScheduleRoutingModule } from 'src/app/route/schedule-routing.module';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';



@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleFormComponent
  ],
  imports: [
    ScheduleRoutingModule,
    SharedModule,
  ]
})
export class ScheduleModule { }
