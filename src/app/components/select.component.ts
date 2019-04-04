import {Component, OnInit} from '@angular/core';
import {DynamicControl} from './DynamicControl';

@Component({
  selector: 'app-dynamic-select',
  template: `
    <mat-form-field class="demo-full-width margin-top" [formGroup]="formGroup">
      <mat-select [placeholder]="field.label" [formControlName]="field.name">
        <mat-option *ngFor="let item of field.options" [value]="item.value">{{item.name}}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['dynamic-form.component.scss']
})
export class SelectComponent extends DynamicControl implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
