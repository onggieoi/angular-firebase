import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { errorMessageHandler } from 'src/app/shared/helper';

export type RadioOptionType<T> = {
  label: string;
  value: T;
}

@Component({
  selector: 'app-radio-field',
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.scss']
})
export class RadioFieldComponent implements OnInit, ControlValueAccessor {
  radioForm = new FormControl();
  fieldName: string = '';
  @Input() label: string = '';
  @Input() options: RadioOptionType<any>[] = [];

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
      this.radioForm.setValidators(control.validator);
      this.fieldName = this.controlDir.name as string;
    }
  }

  writeValue(obj: any): void {
    obj && this.radioForm.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.radioForm.valueChanges.pipe().subscribe({
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
    return errorMessageHandler(this.radioForm, this.fieldName);
  }
}
