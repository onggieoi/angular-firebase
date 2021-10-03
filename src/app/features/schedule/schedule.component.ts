import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ScheduleService } from 'src/app/services/schedule.service';

import Schedule from 'src/app/types/ScheduleType';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  subs: Subscription[] = [];
  displayedColumns: string[] = ['title', 'creator', 'description', 'location', 'startTime', 'endTime', 'actions'];
  schedules: Schedule[] = [];

  constructor(
    private router: Router,
    private scheduleService: ScheduleService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.loadingService.on();

    this.subs.push(
      this.scheduleService.getSchedules().subscribe((schedules: Schedule[]) => {
        this.schedules = schedules;

        this.loadingService.off();
      })
    );
  }

  onAddSchedule() {
    this.router.navigateByUrl('/schedules/add');
  }

  onEdit(id: string) {
    this.router.navigateByUrl(`/schedules/edit/${id}`);
  }

  onDelete(id: string) {
    this.loadingService.on();
    console.log(id);

    setTimeout(() => {
      this.scheduleService.deleteSchedule(id, () => {
        this.loadingService.off();
      });
    }, 500);
  }
}
