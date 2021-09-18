import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'any'
})
export class PostService {

  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthService,
  ) { }

  getAllPost(): Observable<any> {
    return this.fireStore.collection<any>('posts', ref => {
      ref.orderBy('time', 'desc');
      ref.where('uid', '==', 'abc')
      return ref;
    })
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(item => ({
          id: item.payload.doc.id,
          ...item.payload.doc.data(),
        })))
      )
  }

  postMessage(message: string, ownerName: string, otherItems: any): void {
    this.fireStore.collection('posts').add({
      message,
      title: ownerName,
      // user_id: this.authService.currentUser?.uid,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      ...otherItems
    }).then(res => console.log(res))
      .catch(err => console.log(err));
  }
}
