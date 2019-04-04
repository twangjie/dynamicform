import {Component, OnInit} from '@angular/core';
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
  selector: 'app-dynamic-map',
  template: `
    <mat-form-field class="demo-full-width" [formGroup]="formGroup">
      <textarea matInput #input [formControlName]="field.name" [placeholder]="field.label"></textarea>
      <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
        <mat-error *ngIf="formGroup.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
      </ng-container>
    </mat-form-field>
  `,
  styleUrls: ['dynamic-form.component.scss']
})
export class MapComponent extends DynamicControl implements OnInit {

  // @ViewChild('textarea') textarea: ElementRef;

  constructor() {
    super();
  }

  ngOnInit() {
    // console.log(this.field.name + ' ngOnInit');
    // console.log(this.field);
  }
}
