export interface Validator {
  name: string;
  validator: any;
  message: string;
}

export interface Option {
  name: string;
  value: any;
}

export interface FieldConfig {
  index?: number;
  key?: string;
  label?: string;
  catalog?: string;
  catalogDesc?: string;
  subCatalog?: string;
  subCatalogDesc?: string;
  value?: any;
  defaultValue?: any;
  options?: Option[];
  type: string;
  inputType?: string;
  name?: string;
  comment?: string;
  validations?: Validator[];
  readOnly?: boolean;
  rebootRequired?: boolean;
}
