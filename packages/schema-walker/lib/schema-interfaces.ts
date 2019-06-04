export interface SchemaEntry {
  type: string;
  // format?: string;
  // required?: boolean;
  constraints: Constraint[];
}

export interface ObjectEntry extends SchemaEntry {
  properties: { [propName: string]: SchemaEntry };
}

export interface PrimitiveSchemaEntry extends SchemaEntry {}

export interface Constraint {
  name: string;
}

export interface CustomValidator extends Constraint {
  args: any[];
}

// This can be used for moreThan and lessThan validators
export interface RangeValidator extends Constraint {
  args: [number];
}

export interface EnumValidator extends Constraint {
  name: "enum";
  args: [any[] /* enum values */, string[]? /* enum titles */];
}
