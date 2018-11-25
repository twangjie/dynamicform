import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Validators} from '@angular/forms';
import {Catalog, FieldConfig} from './field.interface';
import {DynamicFormComponent} from './components/dynamic-form/dynamic-form.component';
import {ConfigService} from './config.service';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  allCatalog = {name: '全部配置项', value: 'all'};

  selectedCatalog: Catalog = this.allCatalog;

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  dataChange = new BehaviorSubject<FieldConfig[]>([]);
  catalogClickedEvtSub: Subscription;

  constructor(private configService: ConfigService) {
    // this.dataChange.next(configService.configFields);
    this.catalogClickedEvtSub = this.configService.catalogClicked$.subscribe(item => this.onCatalogSelected(item));
  }

  submit(value: any) {
    const val = this.getValue();
    console.log(val);
    alert(val);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.catalogClickedEvtSub.unsubscribe();
  }

  resetSelectedCatalog() {

    this.selectedCatalog = this.allCatalog;
  }

  onCatalogSelected(cataLogName) {

    this.resetSelectedCatalog();

    let fields = this.configService.configFields;
    if (cataLogName !== undefined) {

      const first = fields.filter(item => (item.catalog !== undefined && item.catalog.name === cataLogName))[0];

      this.selectedCatalog = first.catalog;

      fields = this.configService.configFields.filter(item =>
        (item.type === 'button' || (item.catalog !== undefined && item.catalog.name === cataLogName))
      );
    }

    this.form.setConfig(fields);
    this.dataChange.next(fields);
  }

  getValue() {

    const names = Object.keys(this.form.value);
    const configs = [];

    names.forEach(item => {
        const value = this.form.value[item];
        if (value === undefined) {
          return;
        }
        configs.push({key: item, value: this.form.value[item]});
      }
    );

    const allConfigs = this.configService.configFields;
    configs.forEach(config => {
      allConfigs.filter(ori => ori.name === config.key).forEach(filtered =>
        config.key = filtered.key
      );

    });

    return JSON.stringify(configs);
  }

  getConfig() {

    this.resetSelectedCatalog();

    const config = this.configService.configFields;
    config.forEach(item => {
      if (item.name === undefined && item.key !== undefined && item.key.length > 0) {
        item.name = item.key.split('.').join('');
      }
    });

    this.dataChange.next(config);

    this.form.setConfig(config);
    console.log(JSON.stringify(this.dataChange.value));
  }
}
