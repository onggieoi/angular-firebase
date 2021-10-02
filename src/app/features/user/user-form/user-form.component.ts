import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { userFormat } from 'src/app/shared/helper';
import { User } from 'src/app/types/UserType';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Output() onCancelNewUser = new EventEmitter();


  userForm: FormGroup;
  isReadOnly: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: AuthService,
    private loadingService: LoadingService,
  ) {
    this.userForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });

    this.isReadOnly = true;
    this.user = {} as User;
  }
  ngOnChanges(changes: SimpleChanges): void {
    const user = changes.user.currentValue;
    if (user) {
      if (!user.uid) {
        this.isReadOnly = false;
      }

      this.userForm.setValue({
        name: user.name,
        role: user.role,
      });
    }
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.loadingService.on();

    const { email, password, name, role } = userFormat(this.userForm.value);
    console.log(email, password, name, role);

    setTimeout(() => {
      if (this.user.uid) {
        this.userService.updateUser(this.user.uid, name, role);
      } else {
        this.userService.createuser(email, password, name, role);
      }

      this.loadingService.off();
    }, 1000);
  }

  onCancel(): void {
    this.isReadOnly = true;
    if (!this.user.uid) {
      this.onCancelNewUser.emit();
    }
  }

  onEdit(): void {
    this.isReadOnly = false;
  }

  onDelete(): void {
    this.loadingService.on();

    setTimeout(() => {
      this.userService.deleteUser(this.user.uid, () => {
        this.loadingService.off();
      })
    }, 1000);
  }

  isDeleteAble() {
    const currentUser = this.userService.getUserCurrent();

    if (!this.user.uid || this.user.uid === currentUser?.uid) return true;

    return false;
  }
}
