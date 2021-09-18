import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../types/UserType';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserObservable: Observable<User | null>;
  private currentUser?: User;
  private currentUser$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.currentUserObservable = this.fireAuth.authState;

    this.currentUserObservable.subscribe(user => {
      if (user) {
        this.fireStore.collection<User>('users')
          .doc<User>(user.uid)
          .valueChanges()
          .subscribe(currentUser => {
            if (currentUser) {
              this.currentUser = currentUser;
              this.currentUser$.next(this.currentUser);
            }
          })
      }
    })
  }

  getCurrentUser(): Observable<User | undefined> {
    return this.currentUser$.asObservable();
  }

  createuser(email: string, password: string, firstName: string, lastName: string, callback?: () => void) {
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res) {
          this.fireStore.collection('users').doc(res.user?.uid)
            .set({
              firstName,
              lastName,
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

  getUserObservable(): Observable<User | null> {
    return this.currentUserObservable;
  }

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.currentUserObservable = this.fireAuth.authState;

        this.fireStore.collection<User>('users')
          .doc<User>(res.user?.uid)
          .valueChanges()
          .subscribe(user => {
            this.currentUser = user;
            this.currentUser$.next(this.currentUser);
          })
      }).catch(err => console.log(err));
  }

  logout() {
    this.fireAuth.signOut().then(res => {
      this.currentUser = undefined;
      this.currentUser$.next(this.currentUser);

      this.router.navigateByUrl('/login')
    }).catch(err => console.log(err));
  }
}
