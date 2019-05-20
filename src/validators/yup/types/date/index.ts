import { MixedSchemaEntry } from "../mixed";
import { createDateGuard } from "./guard";

const proceed = (obj, config = {}) => {
  return createDateGuard(obj, config).verify();
};

export function toDate(obj, config = {}) {
  return proceed(obj, config) && buildSchemaEntry(obj);
}

export function toSchemaEntry(obj, config = {}) {
  return proceed(obj, config) && buildSchemaEntry(obj);
}

export function buildSchemaEntry(obj) {
  return DateSchemaEntry.schemaEntryFor(obj);
}

// Note: all types inherit from mixed
// See https://github.com/jquense/yup#mixed
export class DateSchemaEntry extends MixedSchemaEntry {

  constructor(obj) {
    super(obj);
    this.type = "date";
    // this.validatorTypeApi = this.yup.date();
  }

  static schemaEntryFor(obj) {
    return new DateSchemaEntry(obj);
  }

  get constraintsTypeMap() {
    return {
      dateRange: "date",
      minDate: "date",
      maxDate: "date"
    };
  }

  get constraintsMap() {
    return {
      dateRange: ["minDate", "maxDate"]
    };
  }

  get aliasMap() {
    return {
      minDate: ["min"],
      maxDate: ["max"]
    };
  }
}
