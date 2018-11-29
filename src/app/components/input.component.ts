import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DynamicControl} from './DynamicControl';

/**
 * It looks like you're using the disabled attribute with a reactive formGroup directive. If you set disabled to true
 when you set up this control in your component class, the disabled attribute will actually be set in the DOM for
 you. We recommend using this approach to avoid 'changed after checked' errors.

 Example:
 formGroup = new FormGroup({
        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
        last: new FormControl('Drew', Validators.required)
      });
 */

@Component({
  selector: 'app-dynamic-input',
  template: `
    <mat-form-field class="demo-full-width" [formGroup]="formGroup">
      <input matInput #input [formControlName]="field.name" [placeholder]="field.label" [type]="getInputType()"
             [autocomplete]="getAutoComplete()">
      <mat-icon matSuffix (click)="hide = !hide" *ngIf="isPassword()">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
      <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
        <mat-error *ngIf="formGroup.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
      </ng-container>
    </mat-form-field>
  `,
  styles: []
})
export class InputComponent extends DynamicControl implements OnInit {

  hide = true;

  @ViewChild('input') input: ElementRef;

  constructor() {
    super();
  }

  ngOnInit() {
    // console.log(this.field.name + ' ngOnInit');
  }

  isPassword() {
    return (this.field.inputType !== undefined && this.field.inputType === 'password');
  }

  getAutoComplete() {
    if (this.field.inputType !== undefined && this.field.inputType === 'password') {
      return 'new-password';
    } else {
      return 'off';
    }
  }

  getInputType() {
    if (this.field.inputType === 'password') {
      return this.hide ? 'password' : 'text';
    }

    return this.field.inputType;
  }
}
