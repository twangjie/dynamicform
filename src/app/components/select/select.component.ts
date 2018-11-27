import {Component, OnInit} from '@angular/core';
import {DynamicControl} from '../DynamicControl';

@Component({
  selector: 'app-select',
  template: `
    <mat-form-field class="demo-full-width margin-top" [formGroup]="formGroup">
      <mat-select [placeholder]="field.label" [formControlName]="field.name">
        <mat-option *ngFor="let item of field.options" [value]="item.value">{{item.name}}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: []
})
export class SelectComponent extends DynamicControl implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
