import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.authService.getUserObservable().subscribe(user => {
        if (user) {
          this.router.navigateByUrl('/').then();
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.map(sup => sup.unsubscribe());
  }

  login(form: NgForm): void {
    console.log(form.value);
    const { email, password } = form.value;
    this.authService.login(email, password);

    form.resetForm();
  }
}
