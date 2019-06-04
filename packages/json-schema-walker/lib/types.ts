export interface JsonSchemaEntry {
  type: string;
}

export interface ObjectEntry extends JsonSchemaEntry {
  title?: string;
  propertyNames?: string[];
  properties?: {
    [propName: string]: any;
  };
  [key: string]: any;
}

export interface ArrayEntry extends JsonSchemaEntry {
  type: string;
  items?: ArrayItemsEntry[];
}

export interface ArrayItemsEntry {
  type: string;
  properties: ObjectEntry[];
}
