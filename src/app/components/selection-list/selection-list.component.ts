import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../../field.interface';

@Component({
  selector: 'app-selection-list',
  templateUrl: 'selection-list.component.html',
  styles: []
})
export class SelectionListComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

  getSelected() {
    const control = this.group.get(this.field.name);

    const selectedVal = control.value;

    const options = this.field.options.filter(opt => selectedVal.indexOf(opt.value) !== (-1));
    const selectedName = options.map(opt => opt.name);

    return selectedName.join(',');
  }

  onSelection(e, v) {
    // console.log(e.option.selected, v);
  }
}
