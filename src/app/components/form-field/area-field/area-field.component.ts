import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

import { errorMessageHandler } from 'src/app/shared/helper';

@Component({
  selector: 'app-area-field',
  templateUrl: './area-field.component.html',
  styleUrls: ['./area-field.component.scss']
})
export class AreaFieldComponent implements OnInit, ControlValueAccessor {
  areaForm = new FormControl();
  fieldName: string = '';
  @Input() @Optional() placeholder: string = '';
  @Input() label: string = '';

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
      this.areaForm.setValidators(control.validator);
      this.fieldName = this.controlDir.name as string;
    }
  }

  writeValue(obj: any): void {
    obj && this.areaForm.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.areaForm.valueChanges.pipe().subscribe({
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
    return errorMessageHandler(this.areaForm, this.fieldName);
  }
}
