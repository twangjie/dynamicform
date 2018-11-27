import {ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../../field.interface';
import {InputComponent} from '../input/input.component';
import {ButtonComponent} from '../button/button.component';
import {SelectComponent} from '../select/select.component';
import {DateComponent} from '../date/date.component';
import {RadiobuttonComponent} from '../radiobutton/radiobutton.component';
import {CheckboxComponent} from '../checkbox/checkbox.component';
import {SelectionListComponent} from '../selection-list/selection-list.component';
import {DynamicControl} from '../DynamicControl';

const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  selectionList: SelectionListComponent,
  date: DateComponent,
  radioGroup: RadiobuttonComponent,
  checkbox: CheckboxComponent
};

@Directive({
  selector: '[dynamicField]'
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
