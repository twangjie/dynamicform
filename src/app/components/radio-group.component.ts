import {Component, OnInit} from '@angular/core';
import {DynamicControl} from './DynamicControl';

@Component({
  selector: 'app-dynamic-radiobutton',
  // templateUrl: 'radiobutton.component.html',
  template: `
    <div class="demo-full-width margin-top" [formGroup]="formGroup">
      <!--<label class="radio-label-padding">{{field.label}}</label>-->
      <mat-expansion-panel [expanded]="true">
        <mat-expansion-panel-header style="padding-left: 0px;color: grey;">{{field.label}}</mat-expansion-panel-header>
        <mat-radio-group [formControlName]="field.name">
          <mat-radio-button class="mat-radio-button-padding" *ngFor="let item of field.options" [value]="item.value">
            {{item.name}}
          </mat-radio-button>
        </mat-radio-group>
      </mat-expansion-panel>
    </div>
  `,
  styleUrls: ['dynamic-form.component.scss']
})
export class RadioGroupComponent extends DynamicControl implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }
}

