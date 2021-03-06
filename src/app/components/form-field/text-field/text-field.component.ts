import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { errorMessageHandler } from 'src/app/shared/helper';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent implements OnInit, ControlValueAccessor {
  textForm = new FormControl();
  fieldName: string = '';
  @Input() @Optional() placeholder: string = '';
  @Input() label: string = '';
  @Input() type: string = '';

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
      this.textForm.setValidators(control.validator);
      this.fieldName = this.controlDir.name as string;
    }
  }

  writeValue(obj: any): void {
    obj && this.textForm.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.textForm.valueChanges.pipe().subscribe({
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
    return errorMessageHandler(this.textForm, this.fieldName);
  }
}
