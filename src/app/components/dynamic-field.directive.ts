import {ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../field.interface';
import {InputComponent} from './input.component';
import {ButtonComponent} from './button.component';
import {SelectComponent} from './select.component';
import {DateComponent} from './date.component';
import {RadioGroupComponent} from './radio-group.component';
import {CheckboxComponent} from './checkbox.component';
import {SelectionListComponent} from './selection-list.component';
import {DynamicControl} from './DynamicControl';
import {TextAreaComponent} from "./textarea.component";

const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  selectionList: SelectionListComponent,
  date: DateComponent,
  radioGroup: RadioGroupComponent,
  checkbox: CheckboxComponent,
  textarea: TextAreaComponent
};

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {
  }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);

    const control: DynamicControl = this.componentRef.instance;
    control.setFormGroup(this.group);
    control.setField(this.field);
  }
}
