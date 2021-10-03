import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { MaterialModule } from './material.module';
import { FirebaseModule } from './firebase.module';
import { TextFieldComponent } from '../components/form-field/text-field/text-field.component';
import { AreaFieldComponent } from '../components/form-field/area-field/area-field.component';
import { RadioFieldComponent } from '../components/form-field/radio-field/radio-field.component';
import { DateFieldComponent } from '../components/form-field/date-field/date-field.component';
import { RouterModule } from '@angular/router';

const modules: any[] = [
  CommonModule,
  MaterialModule,
  FirebaseModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
];

const components: any[] = [
  NavbarComponent,
  TextFieldComponent,
  AreaFieldComponent,
  RadioFieldComponent,
  DateFieldComponent,
];

@NgModule({
  declarations: components,
  imports: modules,
  exports: [
    ...components,
    ...modules,
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [AuthService, AuthGuard]
    }
  }
}
