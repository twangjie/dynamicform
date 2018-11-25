import {Injectable} from '@angular/core';
import {FieldConfig} from './field.interface';
import {Validators} from '@angular/forms';
import {Subject} from 'rxjs';

@Injectable()
export class ConfigService {

  get configFields() {
    return this.regConfig;
  }

  private catalogClickedSource = new Subject<any>();
  catalogClicked$ = this.catalogClickedSource.asObservable();

  regConfig: FieldConfig[] = [
    {
      key: 'version',
      type: 'input',
      label: '版本号',
      inputType: 'text',
      value: '2.0.20180922',
      readOnly: true,
      catalog: {name: '基本', value: 'basic'},
    },
    {
      key: 'ms.user.name',
      type: 'input',
      label: '用户名',
      inputType: 'text',
      // name: 'msLoginName',
      catalog: {name: '基本', value: 'basic'},
      value: 'admin',
      defaultValue: '',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Name Required'
        },
        {
          name: 'pattern',
          validator: Validators.pattern('^[a-zA-Z]+$'),
          message: 'Accept only text'
        }, {
          name: 'minlength',
          validator: Validators.minLength(5),
          message: 'Name min length: 5'
        }, {
          name: 'maxlength',
          validator: Validators.maxLength(20),
          message: 'Name max length: 20'
        }
      ]
    },
    {
      key: 'ms.user.email',
      type: 'input',
      label: 'Email Address',
      inputType: 'email',
      name: 'email',
      catalog: {name: '基本', value: 'basic'},
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Email Required'
        },
        {
          name: 'pattern',
          validator: Validators.pattern(
            '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
          ),
          message: 'Invalid email'
        }
      ]
    },
    {
      key: 'ms.user.password',
      type: 'input',
      label: 'Password',
      inputType: 'password',
      name: 'password',
      catalog: {name: '基本', value: 'basic'},
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Password Required'
        }, {
          name: 'minlength',
          validator: Validators.minLength(5),
          message: 'Name min length: 5'
        }, {
          name: 'maxlength',
          validator: Validators.maxLength(20),
          message: 'Name max length: 20'
        }
      ]
    },
    {
      key: 'ms.user.age',
      type: 'input',
      label: '年龄',
      inputType: 'number',
      name: 'age',
      catalog: {name: '基本', value: 'basic'},
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Age Required'
        }, {
          name: 'min',
          validator: Validators.min(18),
          message: 'Age must greater than 18'
        }, {
          name: 'max',
          validator: Validators.max(90),
          message: 'Age must less than 90'
        }
      ]
    },
    {
      key: 'ms.user.gender',
      type: 'radioGroup',
      label: 'Gender',
      name: 'gender',
      catalog: {name: '基本', value: 'basic'},
      options: [{name: 'Male', value: 'male'}, {name: 'Female', value: 'female'}, {name: 'Third gender', value: '3rdGender'}],
      value: 'Male'
    },
    {
      key: 'ms.user.birthday',
      type: 'date',
      label: '日期',
      name: 'dob',
      catalog: {name: '高级', value: 'advanced'},
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Date of Birth Required'
        }
      ]
    },
    {
      key: 'ms.user.country',
      type: 'select',
      label: 'Country',
      name: 'country',
      catalog: {name: '高级', value: 'advanced'},
      value: 'UK',
      options: [{name: '印度', value: 'India'}, {name: '阿拉伯联合酋长国', value: 'UAE'}, {name: '英国', value: 'UK'}, {name: '美国', value: 'US'}]
    },
    {
      key: 'ms.user.plugins',
      type: 'selectionList',
      name: 'plugins',
      catalog: {name: '高级', value: 'advanced'},
      label: '可选插件',
      value: ['Hik', 'DaHua'],
      options: [{name: '海康', value: 'Hik'}, {name: '大华', value: 'DaHua'}, {name: '宇视', value: 'UniView'}]
    },
    {
      key: 'ms.user.term',
      type: 'checkbox',
      label: 'Accept Terms',
      name: 'term',
      catalog: {name: '其他', value: 'others'},
      value: true
    },
    {
      type: 'button',
      label: '保存'
    }
  ];
  announceCatalogClicked = (item) => this.catalogClickedSource.next(item);
}
