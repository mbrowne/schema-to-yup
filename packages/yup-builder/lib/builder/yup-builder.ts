import * as yup from "yup";
import { Loggable, util } from "@schema-validator/core";
import { TransformProps } from "./transform-props";
const { isObject, isObjectType } = util;

type YupApiMethod = "mixed " | "string" | "date";

type ApiDef = {
  [key: string]: Function;
};

export class YupBuilder extends Loggable {
  type: YupApiMethod;
  api: ApiDef;

  constructor(config: any = {}) {
    super(config);
    this.type = config.type || "mixed";
    this.api = yup[this.type]();
  }

  toArg() {}

  get argMap() {
    return {
      round: (val: string) => ({ type: val })
    };
  }

  get object() {
    return yup.object();
  }

  build(shape: any) {
    if (!isObject(shape)) {
      return this.error(`invalid schema: must be an object type, was: ${shape.type}`);
    }
    const { properties } = shape;
    if (!isObjectType(properties)) {
      return this.error(
        `invalid schema: must have a properties object: ${JSON.stringify(
          properties
        )}`
      );
    }
    const transformer = new TransformProps(shape);
    return this.object.shape(transformer.toShape());
  }
}
