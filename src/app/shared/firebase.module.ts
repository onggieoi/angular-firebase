import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { environment } from 'src/environments/environment';

const modules: any[] = [
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFirestoreModule,
  AngularFireAuthModule,
];

@NgModule({
  imports: modules,
  exports: modules,

})
export class FirebaseModule { }
