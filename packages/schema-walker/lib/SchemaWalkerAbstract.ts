import { ISchemaWalkerConfig } from "./config";

export interface IWalkEventHandlers {
  enter(entry: AnyObject);
  exit(entry: AnyObject);
}

export interface ISchemaWalker {
  walk(handlers: IWalkEventHandlers): void;
}

export abstract class SchemaWalkerAbstract implements ISchemaWalker {
  config: ISchemaWalkerConfig;
  entry: AnyObject;

  constructor(config: ISchemaWalkerConfig, entry: AnyObject) {
    this.config = config;
    this.entry = entry;
  }

  protected hasChildren() {
    return false;
  }

  walk(handlers: IWalkEventHandlers) {
    const { enter, exit } = handlers;
    if (enter) {
      enter(this.entry);
    }
    if (this.hasChildren()) {
      this.walkChildren(handlers);
    }
    if (exit) {
      exit(this.entry);
    }
  }

  protected walkChildren(handlers: IWalkEventHandlers) {
    console.warn("walkChildren() called but subclass did not implement it");
  }
}
