import {Component, OnInit} from '@angular/core';
import {FieldConfig} from '../field.interface';
import {DynamicFormComponent} from './dynamic-form.component';
import {DynamicControl} from './DynamicControl';

@Component({
  selector: 'app-dynamic-button',
  template: `
    <div class="demo-full-width margin-top" [formGroup]="formGroup">
      <button type="submit" mat-raised-button color="primary" [name]="getName()" (click)="onSubmit($event)">{{field.label}}</button>
      <!--[formaction]="getFormAction(field)">{{field.label}}</button>-->
    </div>
  `,
  styles: []
})
export class ButtonComponent extends DynamicControl implements OnInit {

  constructor(private dyForm: DynamicFormComponent) {
    super();
  }

  ngOnInit() {

    // if (this.getField().value === 'save') {
    //   console.log(this.field);
    // }
  }

  getFormAction(field: FieldConfig) {

    const url = this.dyForm.actionUrl + '?button=' + field.value;

    return url;
  }

  getFormMethod() {
    if (this.field.value === 'save') {
      return 'put';
    } else {
      return 'post';
    }
  }

  getName() {
    if (this.field.name === undefined || this.field.name === null) {
      return 'btn_' + this.field.index;
    }

    return this.field.name;
  }

  onSubmit(event) {
    this.dyForm.onSubmit(event, this.getFormMethod(), this.field.endPoint);
  }
}
