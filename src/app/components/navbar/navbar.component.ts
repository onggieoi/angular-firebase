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
          if (user) {
            this.isAuth = true;
            const { email } = userFormat({ name: user.name, role: user?.role });
            this.email = email;
          }

          this.loadingService.off();
        }),
    );
  }
  getActiveHome() {
    if (this.router.url === '/') return 'active';
    return '';
  }

  onNavigate(navs: Navs) {
    this.router.navigateByUrl(navs);
  }

  getLoading() {
    return this.loadingService.isLoading;
  }

  onLogout() {
    this.authService.logout().then(() => {
      window.location.reload();
    })
  }
}
