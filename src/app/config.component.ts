import {Component, Injectable, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Catalog, FieldConfig} from './field.interface';
import {DynamicFormComponent} from './components/dynamic-form.component';
import {ConfigService} from './config.service';
import {BehaviorSubject, merge, Observable, of, Subscription} from 'rxjs';
import {FlatTreeControl} from '@angular/cdk/tree';
import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-config-root',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {

  processing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  CONFIG_URI = '/api/v1/config';
  urlPrefix = 'http://127.0.0.1:4200';
  url = this.urlPrefix + this.CONFIG_URI;

  treeControl: FlatTreeControl<CatalogTreeFlatNode>;
  dataSource: DynamicDataSource;
  defaultCatalogs = [{name: '全部配置项', value: '__ALL__'}];
  catalogs = [];

  selectedCatalog: Catalog = this.defaultCatalogs[0];

  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;

  fieldConfigBehavior = new BehaviorSubject<FieldConfig[]>([]);
  catalogClickedEvtSub: Subscription;

  configs = [];

  /**
   *  __RETURN_TYPE__，用于指定前段修改值后的返回方式：
   *  1、ASSEMBLED_KV_OBJ: 告诉前端将key作为对象的一个属性，随这个对象发送回来，这种方式只能修改key最对应的value字段；
   *  2、OBJECT_LIST： 告诉前端按照Config对象的方式发送修改指令，这种方式可以修改除index外的所有字段。
   */
  returnType = 'ASSEMBLED_KV_OBJ';
  saveValueAsString = false;

  @ViewChild('dyForm') dyForm;

  getLevel = (node: CatalogTreeFlatNode) => node.level;

  isOrg = (_: number, node: CatalogTreeFlatNode) => node.type === CatalogNodeType.CATALOG;
  isDevice = (_: number, node: CatalogTreeFlatNode) => node.type === CatalogNodeType.SUB_CATALOG;

  // isExpandable = (node: CatalogTreeFlatNode) => (node.isOrg);
  isExpandable(node: CatalogTreeFlatNode) {
    return node.type === CatalogNodeType.CATALOG;
  }

  constructor(
    private snackBar: MatSnackBar,
    private configService: ConfigService) {
    // this.fieldConfigBehavior.next(configService.configFields);
    this.catalogClickedEvtSub = this.configService.catalogClicked$.subscribe(item => this.onCatalogSelected(item));

    this.treeControl = new FlatTreeControl<CatalogTreeFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl);
  }

  onInputUrlChang(event) {
    this.urlPrefix = event.target.value;
    if (this.urlPrefix === '') {
      this.url = '';
    } else {
      this.url = this.urlPrefix + this.CONFIG_URI;
    }
  }

  submit(data: any) {

    this.processing.next(true);

    let val = this.getValue(false);

    if (val === undefined || val.length === 0) {
      this.showSnackMessage('没有需要提交的更改', '关闭', 1000);
      return;
    }

    const actionUrl = this.urlPrefix + data.actionUrl;

    if (this.returnType === 'ASSEMBLED_KV_OBJ') {
      val = data.value;
      this.configService.updateConfig(actionUrl, val, data.method).subscribe(resp => {
          console.log(resp);
          this.showSnackMessage(resp, '成功');

          this.processing.next(false);
        },
        // Errors will call this callback instead:
        err => {
          const errResp: HttpErrorResponse = err;
          console.log(errResp.status, errResp.error);
          this.showSnackMessage(JSON.stringify(errResp.error), errResp.status === 200 ? '成功' : '失败');

          this.processing.next(false);
        }
      );
    } else {
      val = this.getValue(true);
      this.configService.updateConfig(actionUrl, val, data.method).subscribe(resp => {
          console.log(resp);
          this.showSnackMessage(resp, '成功');

          this.processing.next(false);
        },
        // Errors will call this callback instead:
        err => {
          const errResp: HttpErrorResponse = err;
          console.log(errResp.status, errResp.error);
          this.showSnackMessage(JSON.stringify(errResp.error), errResp.status === 200 ? '成功' : '失败');

          this.processing.next(false);
        });
    }

    console.log(val);
    // alert(val);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.catalogClickedEvtSub.unsubscribe();
  }

  resetSelectedCatalog() {

    this.selectedCatalog = this.defaultCatalogs[0];
  }

  onCatalogSelected(catalogName) {

    this.resetSelectedCatalog();

    let fields = JSON.parse(JSON.stringify(this.configs));
    if (catalogName !== undefined && catalogName !== this.defaultCatalogs[0].name) {

      const first = fields.filter(item => (item.catalog !== undefined && item.catalog.name === catalogName))[0];

      this.selectedCatalog = first.catalog;
      if (this.returnType === 'ASSEMBLED_KV_OBJ') {
        this.dyForm.actionUrl = this.CONFIG_URI + '/' + this.selectedCatalog.value;
      } else {
        this.dyForm.actionUrl = this.CONFIG_URI;
      }

      fields = this.configs.filter(item =>
        (item.catalog !== undefined && item.catalog.name === catalogName)
      );
    }

    fields.push({type: 'button', label: '保存', value: 'save', catalog: fields[0].catalog});

    this.dynamicForm.setConfig(fields);
    this.fieldConfigBehavior.next(fields);
  }

  getValue(checkDirty: boolean) {

    const formControlNames = Object.keys(this.dynamicForm.value);
    const configs = [];

    formControlNames.forEach(name => {

        const currentControl = this.dynamicForm.formGroup.controls[name];

        if (checkDirty && !currentControl.dirty && currentControl.pristine) {
          return;
        }

        const value = this.dynamicForm.value[name];
        if (value === undefined) {
          return;
        }

        const key = this.findConfigKeyByName(name);
        if (this.returnType === 'ASSEMBLED_KV_OBJ') {
          const obj = {};
          obj[key] = this.dynamicForm.value[name];
          configs.push(obj);
        } else {
          configs.push({key: key, value: this.dynamicForm.value[name]});
        }
      }
    );

    // 根据name找key
    if (this.returnType !== 'ASSEMBLED_KV_OBJ') {
      const allConfigs = this.configs;
      configs.forEach(config => {
        allConfigs.filter(ori => ori.name === config.key).forEach(filtered =>
          config.key = filtered.key
        );
      });
    }

    return configs;
  }

  findConfigKeyByName(name) {
    const ret = this.configs.filter(ori => ori.name === name);
    return ret[0].key;
  }

  getValueAsync(checkDirty: boolean): Observable<any> {
    return of(this.getValue(checkDirty));
  }

  getConfig() {

    this.resetSelectedCatalog();

    this.returnType = 'ASSEMBLED_KV_OBJ';

    this.configService.getConfigFields(this.url).subscribe(items => {

      this.configs = items;

      const retType = this.configs.filter(item => item.key === '__RETURN_TYPE__');
      if (retType !== undefined && retType.length > 0) {
        this.returnType = retType[0].value;
        this.configs = this.configs.filter(item => item.key !== '__RETURN_TYPE__');
      }

      this.saveValueAsString = this.returnType !== 'ASSEMBLED_KV_OBJ';

      this.configs.forEach(item => {
        if ((item.name === undefined || item.name === null) && item.key !== undefined && item.key !== null) {
          item.name = item.key.split('.').join('').split('-').join('').split('_').join('');
        }
        if (item.label === undefined || item.label === null || item.label.length === 0) {
          item.label = item.key;
        }

        if (item.type === undefined || item.type === null || item.type.length === 0) {
          item.type = 'input';
        }

        if (item.inputType === undefined || item.inputType === null || item.inputType.length === 0) {
          item.inputType = 'text';
        }
        if (item.value === undefined || item.value === null || item.value.length === 0) {
          item.value = item.defaultValue;
        }

        // 构造 Validation
        // if (item.validations !== undefined) {
        //   item.validations.forEach(validator => {
        //
        //     switch (validator.name) {
        //       case 'required':
        //         validator.validator = Validators.required;
        //         break;
        //       case 'pattern':
        //         validator.validator = Validators.pattern(validator.value);
        //         break;
        //       case 'minlength':
        //         validator.validator = Validators.minLength(validator.value);
        //         break;
        //       case 'maxlength':
        //         validator.validator = Validators.maxLength(validator.value);
        //         break;
        //       case 'min':
        //         validator.validator = Validators.min(validator.value);
        //         break;
        //       case 'max':
        //         validator.validator = Validators.max(validator.value);
        //         break;
        //     }
        //   });
        // }
      });

      this.configs.sort((item1, item2) => item1.index < item2.index ? -1 : 1);

      // this.configs.push({type: 'button', label: '保存', catalog: this.defaultCatalogs[0]});

      this.fieldConfigBehavior.next(this.configs);

      this.dynamicForm.saveValueAsString = this.saveValueAsString;
      this.dynamicForm.setConfig(this.configs);

      const arr = this.configs.filter(item => item.catalog !== undefined)
        .map(item => item.catalog).reduce((x, y) => x.findIndex(e => e.name === y.name) < 0 ? [...x, y] : x, []);

      this.dyForm.actionUrl = this.CONFIG_URI;

      this.catalogs = [...this.defaultCatalogs];
      this.catalogs.push(...arr);

      const ret = this.catalogs.map(item => new CatalogTreeFlatNode(item.name, CatalogNodeType.CATALOG, 0, undefined, [], item, false));
      this.dataSource.data = ret;

      this.onCatalogSelected(this.defaultCatalogs[0].name);
    }, err => {
      this.showSnackMessage(err.message, '失败', 5000);
    });

  }

  catalogNodeClicked($event, node) {
    // console.log(event, node);
    this.onCatalogSelected(node.name);
  }

  showSnackMessage(message: string, action: string, duration: number = 3000) {

    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}

enum CatalogNodeType {
  CATALOG = 1,
  SUB_CATALOG = 2,
}

export class CatalogTreeFlatNode {
  constructor(public name: string,
              public type: CatalogNodeType,
              public level,
              public parent: CatalogTreeFlatNode,
              public children: CatalogTreeFlatNode[],
              public data: any,
              public disabled: boolean) {
  }
}


@Injectable()
export class DynamicDataSource {

  dataChange = new BehaviorSubject<CatalogTreeFlatNode[]>([]);

  treeNodeInList = [];

  get data(): CatalogTreeFlatNode[] {
    return this.dataChange.value;
  }

  set data(value: CatalogTreeFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private treeControl: FlatTreeControl<CatalogTreeFlatNode>) {

  }

  connect(collectionViewer: CollectionViewer): Observable<CatalogTreeFlatNode[]> {
    this.treeControl.expansionModel.changed!.subscribe(change => {
      if ((change as SelectionChange<CatalogTreeFlatNode>).added ||
        (change as SelectionChange<CatalogTreeFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<CatalogTreeFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  handleTreeControl(change: SelectionChange<CatalogTreeFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleTreeNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleTreeNode(node, false));
    }
  }

  toggleTreeNode(node: CatalogTreeFlatNode, expand: boolean) {

    if (node.type !== CatalogNodeType.CATALOG) {
      return;
    }
  }
}
