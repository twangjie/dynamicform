import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Catalog, FieldConfig} from '../field.interface';

@Component({
    exportAs: 'dynamicForm',
    selector: 'app-dynamic-form',
    templateUrl: 'dynamic-form.component.html',
    styleUrls: ['dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

    @Input() catalog: Catalog;
    @Input() fields: FieldConfig[] = [];

    @Output() submit: EventEmitter<any> = new EventEmitter<any>();

    formGroup: FormGroup;
    actionUrl = '';
    saveValueAsString = false;

    constructor(private fb: FormBuilder) {
    }

    get value() {

        const controlNames = Object.keys(this.formGroup.value);

        this.fields.forEach(item => {

            // 将form中input number控件的值转换为number
            if (!this.saveValueAsString && item.type === 'input' && item.inputType === 'number') {
                const ctrls = controlNames.filter(name => name === item.name);
                if (ctrls !== undefined && ctrls.length > 0) {
                    const value = this.formGroup.value[item.name];
                    this.formGroup.value[item.name] = +value;
                }
            }

            if (item.type === 'selectionList') {
                const value = this.formGroup.value[item.name];
                if (value instanceof Array) {
                    this.formGroup.value[item.name] = value.join(',');
                }
            }

            // 将form中checkbox控件的值转换为string
            if (this.saveValueAsString && item.type === 'checkbox') {
                const value = this.formGroup.value[item.name];
                if (typeof value === 'boolean') {
                    this.formGroup.value[item.name] = value ? 'true' : 'false';
                }
            }
        });

        return this.formGroup.value;
    }

    setConfig(config: FieldConfig[]) {
        this.preprocess(config);

        this.fields = config;
        this.formGroup = this.createControl();
    }

    preprocess(config) {
        config.forEach(field => {

            if (field.type === 'selectionList') {
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
            }

        });
    }

    ngOnInit() {
        this.formGroup = this.createControl();
    }

    createControl() {
        const group = this.fb.group({});
        this.fields.forEach(field => {
            if (field.type === 'button') {
                return;
            }

            let value = field.value;
            if (field.type === 'selectionList') {
                // 不绑定selectionList的值，在selectionList对象的ngAfterViewInit绑定，
                // 防止ExpressionChangedAfterItHasBeenCheckedError
                value = [];
            }

            const control = this.fb.control(
                {value: value, disabled: field.readOnly === true},
                this.bindValidations(field.validations || [])
            );
            // const control = this.fb.control(
            //   {value: '', disabled: field.readOnly === true},
            //   this.bindValidations(field.validations || [])
            // );
            group.addControl(field.name, control);
        });
        return group;
    }

    bindValidations(validations: any) {
        if (validations.length > 0) {
            const validList = [];
            validations.forEach(valid => {
                let validator = valid.validator;
                if (validator !== undefined) {
                    validList.push(validator);
                } else {
                    switch (valid.name) {
                        case 'required':
                            validator = Validators.required;
                            break;
                        case 'pattern':
                            validator = Validators.pattern(valid.value);
                            break;
                        case 'minlength':
                            validator = Validators.minLength(valid.value);
                            break;
                        case 'maxlength':
                            validator = Validators.maxLength(valid.value);
                            break;
                        case 'min':
                            validator = Validators.min(valid.value);
                            break;
                        case 'max':
                            validator = Validators.max(valid.value);
                            break;
                        default:
                            return;
                            break;
                    }

                    validList.push(validator);
                }

            });
            return Validators.compose(validList);
        }
        return null;
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            control.markAsTouched({onlySelf: true});
        });
    }

    onSubmit(event: Event, method, actionUrl) {

        event.preventDefault();
        event.stopPropagation();
        if (this.formGroup.valid) {
            this.submit.emit({
                event: event,
                value: this.formGroup.value,
                action: 'submit',
                actionUrl: (actionUrl === undefined ? this.actionUrl : actionUrl),
                method: method
            });
        } else {
            this.validateAllFormFields(this.formGroup);
        }
    }

    onClose($event) {
        event.preventDefault();
        event.stopPropagation();
        this.submit.emit({
            event: event,
            value: this.formGroup.value,
            action: 'close'
        });
    }
}
