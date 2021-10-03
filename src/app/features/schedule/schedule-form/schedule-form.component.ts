import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { newSchedule } from 'src/app/shared/dateHelper';
import { formatScheduleForm } from 'src/app/shared/helper';
import Schedule from 'src/app/types/ScheduleType';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent implements OnInit {
  @Input() schedule: Schedule;

  scheduleForm: FormGroup;
  sub: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private scheduleServices: ScheduleService,
    private router: Router,
    private loadingService: LoadingService,
  ) {
    this.scheduleForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      startTime: new FormControl(newSchedule(), [Validators.required]),
      endTime: new FormControl(newSchedule().add(1, 'h'), [Validators.required]),
    });

    this.schedule = {} as Schedule;
  }

  ngOnInit(): void {
    this.loadingService.on();

    const routeParams = this.route.snapshot.paramMap;
    const scheduleId = routeParams.get('id');

    if (scheduleId) {
      this.sub.add(
        this.scheduleServices.getSchedule(scheduleId).subscribe(schedule => {
          if (schedule) {
            this.schedule = schedule;

            const { title, description, location, startTime, endTime } = schedule;

            this.scheduleForm.setValue({
              title,
              description,
              location,
              startTime: new Date(startTime),
              endTime: new Date(endTime),
            });

            this.loadingService.off();
          } else {
            this.router.navigateByUrl('/404');
          }
        }),
      );
    } else {
      this.loadingService.off();
    }
  }

  submit() {
    const values = formatScheduleForm(this.scheduleForm.value) as Schedule;

    this.loadingService.on();

    if (this.schedule.id) {
      console.log('update');

      this.scheduleServices.updateSchedule(this.schedule.id, values, () => {
        this.finishSubmit();
      });
    } else {
      this.scheduleServices.addSchedule(values, () => {
        this.finishSubmit();
      })
    }
  }

  finishSubmit() {
    this.loadingService.off();
    this.router.navigateByUrl('/schedules');
  }
}
