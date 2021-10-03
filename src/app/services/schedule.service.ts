import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DATETIME_FORMAT } from '../shared/dateHelper';
import Schedule from '../types/ScheduleType';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthService,
  ) { }

  getSchedules(): Observable<Schedule[]> {
    return this.fireStore.collection<Schedule>('schedules', ref => {
      ref.orderBy('time', 'desc');

      return ref;
    })
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(item => {
          const val = item.payload.doc.data();

          return {
            ...val,
            id: item.payload.doc.id,
            startTime: moment(val.startTime).format(DATETIME_FORMAT),
            endTime: moment(val.endTime).format(DATETIME_FORMAT),
          }
        })),
      )
  }

  getSchedule(id: string): Observable<any> {
    return this.fireStore.collection<any>('schedules')
      .doc(id)
      .valueChanges()
      .pipe(
        map(schedule => {
          if (schedule) {
            return {
              ...schedule,
              id,
            }
          } else {
            return null;
          }
        })
      )
  }

  addSchedule(schedule: Schedule, cb: Function): void {
    this.fireStore.collection('schedules')
      .add({
        ...schedule,
        creator: this.authService.getUserCurrent()?.name
      })
      .then(res => {
        return cb();
      })
      .catch(err => console.log(err));
  }

  updateSchedule(id: string, schedule: Schedule, cb: Function): void {
    this.fireStore.collection('schedules')
      .doc(id)
      .set({ ...schedule })
      .then(res => {
        return cb();
      }).catch(err => console.log(err))
  }

  deleteSchedule(id: string, cb: Function) {
    this.fireStore.collection('schedules').doc(id).delete()
      .then(res => {
        return cb();
      });
  }
}
