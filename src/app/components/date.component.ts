import {Component, OnInit} from '@angular/core';
import {DynamicControl} from './DynamicControl';

@Component({
    selector: 'app-dynamic-date',
    template: `
        <mat-form-field class="demo-full-width margin-top" [formGroup]="formGroup">
            <input matInput [matDatepicker]="picker" [formControlName]="field.name" [placeholder]="field.label"
                   autocomplete="off"
                   locale="zh" (click)="picker.open()">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-hint></mat-hint>
            <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
                <mat-error
                    *ngIf="formGroup.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
            </ng-container>
        </mat-form-field>
    `,
    styleUrls: ['dynamic-form.component.scss']
})
export class DateComponent extends DynamicControl implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }
}
