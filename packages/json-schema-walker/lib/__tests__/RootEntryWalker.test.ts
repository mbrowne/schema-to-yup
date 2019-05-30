import { createSchemaWalker } from "..";

describe("RootEntryWalker", () => {
  const walker = createSchemaWalker();

  test("validates schema", () => {
    expect(() => {
      walker.walk(null as any, {});
    }).toThrow();

    expect(() => {
      walker.walk("foo" as any, {});
    }).toThrow();

    expect(() => {
      walker.walk({ type: "object" }, {});
    }).toThrow("must have a properties object");
  });

  test("one string property", () => {
    const obj = {
      title: "person",
      type: "object",
      properties: {
        username: {
          type: "string",
        },
      },
    };

    const objCb = entry => expect(entry).toBe(obj);
    const stringCb = (entry, propName) => {
      expect(propName).toBe("username");
      expect(entry).toBe(obj.properties.username);
    };
    walker.walk(obj, {
      object: {
        enter: objCb,
        exit: objCb,
      },
      string: {
        enter: stringCb,
        exit: stringCb,
      },
    });
  });
});
