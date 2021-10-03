import { Component, Input, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import * as moment from 'moment';
import { errorMessageHandler } from 'src/app/shared/helper';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss']
})
export class DateFieldComponent implements OnInit, ControlValueAccessor {
  dateForm = new FormControl();
  fieldName: string = '';
  minDate = moment().add(-1, 'h');

  @Input() label: string = '';
  @Input() type: string = '';

  @ViewChild('picker', { static: true }) pickerFixed?: any

  constructor(
    @Optional() @Self() private controlDir: NgControl,
  ) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }


  ngOnInit(): void {
    if (this.controlDir) {
      const control = this.controlDir.control as AbstractControl;
      this.dateForm.setValidators(control.validator);
      this.fieldName = this.controlDir.name as string;
    }
  }

  writeValue(obj: any): void {
    obj && this.dateForm.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.dateForm.valueChanges.pipe().subscribe({
      next: value => {
        fn(value);
      },
    });
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onTouched: any = () => { };

  getErrorMessage() {
    return errorMessageHandler(this.dateForm, this.fieldName);
  }
}
