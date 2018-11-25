import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../../field.interface';

/**
 * It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true
 when you set up this control in your component class, the disabled attribute will actually be set in the DOM for
 you. We recommend using this approach to avoid 'changed after checked' errors.

 Example:
 form = new FormGroup({
        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
        last: new FormControl('Drew', Validators.required)
      });
 */

@Component({
  selector: 'app-input',
  template: `
    <mat-form-field class="demo-full-width" [formGroup]="group">
      <input matInput [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType"
             [autocomplete]="getAutoComplete(field)">
      <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
        <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
      </ng-container>
    </mat-form-field>
  `,
  styles: []
})
export class InputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() {
  }

  ngOnInit() {
    console.log(this.field.name + ' ngOnInit');
  }

  getAutoComplete(field) {
    if (field.inputType !== undefined && field.inputType === 'password') {
      return 'new-password';
    } else {
      return 'off';
    }
  }
}
