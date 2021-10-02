import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { userFormat } from 'src/app/shared/helper';

type Navs = '/' | '/users' | '/schedules';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  email: string = '';
  sub: Subscription = new Subscription();
  isAuth: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
  ) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.loadingService.on();

    this.sub.add(
      this.authService.getCurrentUser()
        .subscribe(user => {
          console.log(user);
          this.isAuth = true;

          if (user) {
            const { email } = userFormat({ name: user.name, role: user?.role });
            this.email = email;
            this.loadingService.off();
          }
        }),
    );
  }

  onNavigate(navs: Navs) {
    this.router.navigateByUrl(navs);
  }

  getLoading() {
    return this.loadingService.isLoading;
  }

  getActiveNav(nav: Navs) {
    if (nav === this.router.url) return 'active';

    return '';
  }

  onLogout() {
    this.authService.logout();
  }
}
