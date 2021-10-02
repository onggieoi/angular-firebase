import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import Task from '../types/TaskType';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private fireStore: AngularFirestore,
  ) { }

  getTasks(): Observable<Task[]> {
    return this.fireStore.collection<Task>('tasks', ref => {
      ref.orderBy('time', 'desc');

      return ref;
    })
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(item => ({
          ...item.payload.doc.data(),
          id: item.payload.doc.id,
        }))),
      )
  }

  getTask(id: string): Observable<any> {
    return this.fireStore.collection<any>('tasks')
      .doc(id)
      .valueChanges()
      .pipe(
        map(task => {
          if (task) {
            return {
              ...task,
              id,
            }
          } else {
            return null;
          }
        })
      )
  }

  addTask(task: Task, cb: Function): void {
    this.fireStore.collection('tasks')
      .add(task)
      .then(res => {
        return cb();
      })
      .catch(err => console.log(err));
  }

  updateTask(id: string, task: Task, cb: Function): void {
    this.fireStore.collection('tasks')
      .doc(id)
      .set(task)
      .then(res => {
        return cb();
      }).catch(err => console.log(err))
  }

  deleteTask(id: string, cb: Function) {
    this.fireStore.collection('tasks').doc(id).delete();

    return cb();
  }
}
