import { Guard } from "../guard";

export class DateGuard extends Guard {
  config: any;

  constructor(obj: any, config = {}) {
    super(obj, config);
  }

  isValid(): boolean {
    return this.config.isDate(this.obj);
  }
}

export function createDateGuard(obj, config) {
  return new DateGuard(obj, config);
}
