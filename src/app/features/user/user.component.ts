import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { User } from 'src/app/types/UserType';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  subs: Subscription[] = [];
  users: User[] = [];

  constructor(
    private userService: AuthService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.loadingService.on();

    this.subs.push(
      this.userService.getUsers().subscribe((users: User[]) => {
        this.users = users;

        this.loadingService.off();
      })
    );
  }

  onAddUser() {
    this.users.unshift({
      name: '',
      role: '',
    } as User);
  }

  onCancelAddUser() {
    this.users.shift();
  }
}
