export class Validator {
  name: string;
  validator: any;
  message: string;
  value: any;
}

export class Option {
  name: string;
  value: any;
}

export class Catalog {
  name: string;
  value: any;
}

export class SubCatalog {
  name: string;
  value: any;
}

export class FieldConfig {
  index?: number;
  key?: string;
  label?: string;
  catalog?: Catalog;
  subCatalog?: SubCatalog;
  value?: any;
  defaultValue?: any;
  options?: Option[];
  type: string;
  inputType?: string;
  endPoint?: string;
  name?: string;
  comment?: string;
  validations?: Validator[];
  readOnly?: boolean;
  rebootRequired?: boolean;
}
