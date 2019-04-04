import {FieldConfig} from '../field.interface';
import {FormGroup} from '@angular/forms';

export class DynamicControl {

    public field: FieldConfig;
    public formGroup: FormGroup;

    public setField(field: FieldConfig) {
        this.field = field;
    }

    public getField() {
        return this.field;
    }

    public setFormGroup(formGroup: FormGroup) {
        this.formGroup = formGroup;
    }

    public getFormGroup() {
        return this.formGroup;
    }
}
