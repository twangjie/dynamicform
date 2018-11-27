import {Component, OnInit} from '@angular/core';
import {DynamicControl} from '../DynamicControl';

@Component({
  selector: 'app-checkbox',
  template: `
    <div class="demo-full-width margin-top" [formGroup]="formGroup">
      <mat-checkbox [formControlName]="field.name">{{field.label}}</mat-checkbox>
    </div>
  `,
  styles: []
})
export class CheckboxComponent extends DynamicControl implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
