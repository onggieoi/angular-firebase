import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { MaterialModule } from './material.module';
import { FirebaseModule } from './firebase.module';

@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FirebaseModule,
  ],
  exports: [
    NavbarComponent,
    MaterialModule,
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
