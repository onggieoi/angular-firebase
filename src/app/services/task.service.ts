import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
        })))
      )
  }

  getTask(id: string): Observable<Task> {
    return this.fireStore.collection<any>('tasks')
      .doc(id)
      .valueChanges()
      .pipe(
        map(task => ({
          ...task,
          id,
        }))
      )
  }

  addTask(task: Task, cb: Function): void {
    this.fireStore.collection('tasks')
      .add(task)
      .then(res => {
        console.log(res);
        return cb();
      })
      .catch(err => console.log(err));
  }

  updateTask(id: string, task: Task, cb: Function): void {
    this.fireStore.collection('tasks')
      .doc(id)
      .set(task)
      .then(res => {
        console.log(res);
        return cb();
      }).catch(err => console.log(err))
  }
}
