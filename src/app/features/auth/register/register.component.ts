import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  subs: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.subs.push(
    //   this.authService.getUsers().subscribe(user => {
    //     if (user) {
    //       this.router.navigateByUrl('/');
    //     }
    //   }),
    // );
  }

  ngOnDestroy(): void {
    // this.subs.map(sup => sup.unsubscribe());
  }

  register(form: NgForm): void {
    if (form.value) {
      const { fname, lname, email, password } = form.value;
      this.authService.createuser(email, password, fname, lname), () => {
        this.router.navigateByUrl('/login');
        form.resetForm();
      };
    }

  }
}
