import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {ConfigComponent} from './config.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './components/input.component';
import {ButtonComponent} from './components/button.component';
import {SelectComponent} from './components/select.component';
import {DateComponent} from './components/date.component';
import {RadioGroupComponent} from './components/radio-group.component';
import {CheckboxComponent} from './components/checkbox.component';
import {DynamicFieldDirective} from './components/dynamic-field.directive';
import {DynamicFormComponent} from './components/dynamic-form.component';
import {SelectionListComponent} from './components/selection-list.component';
import {ConfigService} from './config.service';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PrettyJsonModule} from 'angular2-prettyjson';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {TextAreaComponent} from "./components/textarea.component";
import {MapComponent} from "./components/map.component";

export const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'L'
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

export const MAT_MOMENT_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'l',
  },
  display: {
    dateInput: 'l',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    ConfigComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    SelectionListComponent,
    DateComponent,
    RadioGroupComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    TextAreaComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    PrettyJsonModule
  ],
  providers: [
    ConfigService,

    // The locale would typically be provided on the root module of your application.
    {provide: MAT_DATE_LOCALE, useValue: 'zh-cn'},
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    // {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  bootstrap: [ConfigComponent],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    SelectionListComponent,
    DateComponent,
    RadioGroupComponent,
    CheckboxComponent,
    TextAreaComponent,
    MapComponent
  ]
})
export class AppModule {
}
