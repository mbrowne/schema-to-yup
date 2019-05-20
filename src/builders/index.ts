import { YupBuilder } from "./yup-builder";
import { buildConfig } from './build-config'
export { YupBuilder };

export function buildYup(schema, config = {}) {
  config = buildConfig(config, schema);
  return new YupBuilder(schema, config).yupSchema;
}
