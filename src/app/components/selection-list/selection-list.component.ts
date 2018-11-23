import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../../field.interface';

@Component({
  selector: 'app-selection-list',
  template: `
<div class="demo-full-width margin-top mat-form-field" [formGroup]="group">
  <p><b>{{field.label}}</b></p>
<mat-selection-list [formControlName]="field.name">
<mat-list-option checkboxPosition="before" *ngFor="let item of field.options" [value]="item.value">{{item.name}}</mat-list-option>
</mat-selection-list>
</div>
`,
  styles: []
})
export class SelectionListComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }
}
