import { JsonSchemaEntry, ObjectEntry as JsonSchemaObjectEntry } from "./types";
import { createSchemaWalker } from "./RootEntryWalker";

// TEMP
interface ObjectEntry {
  type: string;
  constraints: Constraint[];
  properties: { [propName: string]: any };
}

export interface Constraint {
  name: string;
}

export function transformObjectSchema(jsonSchema: JsonSchemaObjectEntry) {
  const walker = createSchemaWalker();
  const abstractSchema: ObjectEntry = {
    type: jsonSchema.type,
  } as ObjectEntry;

  const props = [];
  walker.walk(jsonSchema, {
    // object: {
    //   enter(entry: JsonSchemaObjectEntry) {
    //   }
    // }

    primitive: {
      // TODO - determine which object to attach the entry to instead
      // of assuming it's jsonSchema.properties
      enter(jsonSchemaEntry: JsonSchemaObjectEntry, propName: string) {
        props[propName] = transformPrimitive(jsonSchemaEntry);
      },
    },
  });

  abstractSchema.properties = props;

  // const requiredPropNames = new Set(jsonSchema.required);
  // const props = [];
  // if (jsonSchema.properties) {
  //   for (const [propName, prop] of Object.entries(jsonSchema.properties)) {
  //     const entry = transformSchemaEntry(prop);
  //     if (requiredPropNames.has(propName)) {
  //       entry.constraints.push({
  //         name: "required",
  //       });
  //     }
  //     props[propName] = entry;
  //   }
  // }
  abstractSchema.constraints = [];
  return abstractSchema;
}

// function transformSchemaEntry(prop: JsonSchemaEntry) {
//   switch (prop.type) {
//     case "object":
//       return transformObjectSchema(prop);
//     default:
//       return transformPrimitive(prop);
//   }
// }

function transformPrimitive(entry: JsonSchemaEntry) {
  return {
    type: entry.type,
    constraints: transformConstraints(entry),
  };
}

function transformConstraints(entry: JsonSchemaObjectEntry) {
  const constraints: Constraint[] = [];
  const add = (constraint: Constraint) => {
    constraints.push(constraint);
  };
  switch (true) {
    case entry.required:
      add({
        name: "required",
      });
    case entry.format:
      add({
        name: entry.format,
      });
    case entry.pattern:
      add({
        name: "regex",
      });
  }
  return constraints;
}
