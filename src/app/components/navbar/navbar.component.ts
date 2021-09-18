import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  email: string = '';

  constructor(private authService: AuthService) {
    this.authService.getCurrentUser()
      .subscribe(user => {
        if (user?.email) {
          this.email = user?.email
        }
      });
  }

  ngOnInit(): void {
  }

}
