import { toConstraintsMap, extendYupApi } from "../lib";
import * as yup from "yup";
describe("toConstraintsMap", () => {
  test.skip("no args - throws", () => {
    expect(() => toConstraintsMap()).toThrow();
  });

  test("string item: [`abc`] - ok", () => {
    expect(() => toConstraintsMap(["abc"])).not.toThrow();
  });

  test("object item: `[{}]` - throws", () => {
    expect(() => toConstraintsMap([{}])).toThrow();
  });

  test("object item: `[{name: 'xyz'}]` - ok", () => {
    expect(() => toConstraintsMap([{ name: "xyz" }])).not.toThrow();
    expect(toConstraintsMap([{ name: "xyz" }])).toEqual({
      xyz: { name: "xyz" }
    });
  });
});

describe("extendYupApi", () => {
  const validator = {
    hash: () => true
  };

  const constraints = [{ name: "hash" }];
  test("can add named constraint from validator", () => {
    expect(() =>
      extendYupApi({ constraints, validator, logging: true })
    ).not.toThrow();
    const schema = yup.string().hash();
    expect(typeof schema).toEqual("object");
  });
});
