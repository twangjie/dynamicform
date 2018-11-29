import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FieldConfig} from '../field.interface';
import {DynamicControl} from './DynamicControl';

@Component({
  selector: 'app-dynamic-selection-list',
  template: `
    <div class="demo-full-width margin-top mat-form-field" [formGroup]="formGroup">
      <label class="radio-label-padding">{{field.label}}</label>
      <mat-expansion-panel>
        <mat-expansion-panel-header>已选择：{{getSelected()}}</mat-expansion-panel-header>
        <mat-selection-list [formControlName]="field.name">
          <mat-list-option checkboxPosition="before" *ngFor="let item of field.options" [value]="item.value"
                           style="height: 28px;">{{item.name}}
          </mat-list-option>
        </mat-selection-list>
      </mat-expansion-panel>
    </div>
  `,
  styles: []
})
export class SelectionListComponent extends DynamicControl implements OnInit, AfterViewInit {

  constructor() {
    super();
  }

  setField(field: FieldConfig) {

    super.setField(field);

    if (field.value === undefined || field.value.length === 0) {
      field.value = [];
    }

    let value = field.value;
    if (typeof value === 'string') {
      field.value = value.split(',');
    }

    value = field.defaultValue;
    if (typeof value === 'string') {
      field.defaultValue = value.split(',');
    }

    if (field.options === undefined || field.options === null) {
      field.options = [];
    }

    // this.formGroup.get(field.name).setValue(field.value);
  }

  ngAfterViewInit(): void {

    // FIX ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.formGroup.get(this.field.name).setValue(this.field.value);
    });
  }

  ngOnInit(): void {
  }

  getSelected() {
    const control = this.formGroup.get(this.field.name);

    const selectedVal = control.value;

    if (selectedVal === undefined) {
      return [];
    }

    const options = this.field.options.filter(opt => selectedVal.indexOf(opt.value) !== (-1));
    const selectedName = options.map(opt => opt.name);

    return selectedName.join(',');
  }

  onSelection(e, v) {
    // console.log(e.option.selected, v);
  }
}
