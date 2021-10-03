import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../types/UserType';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserObservable: Observable<any>;
  private currentUser?: User;
  private currentUser$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.currentUserObservable = this.fireAuth.authState as any;

    this.currentUserObservable.subscribe(user => {
      if (user) {
        this.fireStore.collection<User>('users')
          .doc<User>(user.uid)
          .valueChanges()
          .subscribe(currentUser => {
            if (currentUser) {
              this.currentUser = {
                ...currentUser,
                uid: user.uid,
              };
              this.currentUser$.next(this.currentUser);
            }
          })
      }
    })
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser$.asObservable();
  }

  getUserCurrent() {
    return this.currentUser;
  }

  createuser(email: string, password: string, name: string, role: string, callback?: () => void) {
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res) {
          this.fireStore.collection('users').doc(res.user?.uid)
            .set({
              name,
              role,
              email
            }).then(() => {
              // this.fireStore.collection<User>('users')
              //   .doc<User>(res.user?.uid)
              //   .valueChanges()
              //   .subscribe(user => {
              //     this.currentUser = user;
              //     this.currentUser$.next(this.currentUser);
              //   })
            }).catch(setErr => console.log(setErr));
        }
      }).then(callback)
      .catch(err => console.log(err));
  }

  getUserObservable(): Observable<any> {
    return this.currentUserObservable;
  }

  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.currentUserObservable = this.fireAuth.authState as any;

        this.fireStore.collection<User>('users')
          .doc<User>(res.user?.uid)
          .valueChanges()
          .subscribe(user => {
            this.currentUser = user;
            this.currentUser$.next(user);
          });
      }).catch(err => console.log(err));
  }

  logout() {
    return this.fireAuth.signOut().then(res => {
      this.currentUser = undefined;
      this.currentUser$.next(this.currentUser);

      this.router.navigateByUrl('/login');
    }).catch(err => console.log(err));
  }

  getUsers(): Observable<any[]> {
    return this.fireStore.collection<User[]>('users', ref => {
      ref.orderBy('time', 'desc');

      return ref;
    })
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(item => ({
          ...item.payload.doc.data(),
          uid: item.payload.doc.id,
        }))),
      )
  }

  getUser(id: string): Observable<any> {
    return this.fireStore.collection<any>('users')
      .doc(id)
      .valueChanges()
      .pipe(
        map(user => {
          if (user) {
            return {
              ...user,
              uid: id,
            }
          } else {
            return null;
          }
        })
      )
  }

  updateUser(id: string, name: string, role: string, cb?: Function): void {
    this.fireStore.collection('users')
      .doc(id)
      .set({
        name,
        role,
      })
      .then(res => {
        if (cb) {
          return cb();
        }
      }).catch(err => console.log(err))
  }

  deleteUser(id: string, cb: Function) {
    this.fireStore.collection('users').doc(id).delete();

    return cb();
  }
}
