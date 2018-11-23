import {Component, OnInit, ViewChild} from '@angular/core';
import {Validators} from '@angular/forms';
import {FieldConfig} from './field.interface';
import {DynamicFormComponent} from './components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  regConfig: FieldConfig[] = [
    {
      key: 'version',
      type: 'input',
      label: '版本号',
      inputType: 'text',
      value: '2.0.20180922',
      readOnly: true
    },
    {
      key: 'ms.user.name',
      type: 'input',
      label: '用户名',
      inputType: 'text',
      name: 'msLoginName',
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
      options: [{name: 'Male', value: 'Male'}, {name: 'Female', value: 'Female'}],
      value: 'Male'
    },
    {
      key: 'ms.user.birthday',
      type: 'date',
      label: '日期',
      name: 'dob',
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
      value: 'UK',
      options: [{name: 'India', value: 'India'}, {name: 'UAE', value: 'UAE'}, {name: 'UK', value: 'UK'}, {name: 'US', value: 'US'}]
    },
    {
      key: 'ms.user.plugins',
      type: 'selectionList',
      name: 'plugins',
      label: '可选插件',
      value: ['海康', '宇视'],
      options: [{name: '海康', value: '海康'}, {name: '大华', value: '大华'}, {name: '宇视', value: '宇视'}]
    },
    {
      key: 'ms.user.term',
      type: 'checkbox',
      label: 'Accept Terms',
      name: 'term',
      value: true
    },
    {
      type: 'button',
      label: '保存'
    }
  ];

  submit(value: any) {
    console.log(JSON.stringify(value));
    alert(JSON.stringify(value));
  }

  ngOnInit(): void {

    this.regConfig.forEach(item => {
      if ( item.name === undefined && item.key !== undefined && item.key.length > 0) {
        item.name = item.key.split('.').join('');
      }
    });

    console.log(JSON.stringify(this.regConfig));
  }
}
