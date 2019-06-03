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

// describe("entryType", () => {
//   describe("array", () => {
//     const entry = {
//       type: "array"
//     };
//     test("is array", () => {
//       expect(resolver.entryType(entry)).toEqual("array");
//     });
//   });

//   describe("object", () => {
//     const entry = {
//       type: "object"
//     };
//     test("is object", () => {
//       expect(resolver.entryType(entry)).toEqual("object");
//     });
//   });

//   describe("string", () => {
//     const entry = {
//       type: "string"
//     };
//     test("is primitive", () => {
//       expect(resolver.entryType(entry)).toEqual("primitive");
//     });
//   });
// });

// describe("schemaTypeWalkerFor", () => {
//   describe("array", () => {
//     const entry = {
//       type: "array"
//     };
//     const walker = resolver.schemaTypeWalkerFor(entry);
//     test("is array walker", () => {
//       expect(walker.schemaType).toEqual("array");
//     });
//   });

//   describe("object", () => {
//     const entry = {
//       type: "object"
//     };
//     const walker = resolver.schemaTypeWalkerFor(entry);
//     test("is object walker", () => {
//       expect(walker.schemaType).toEqual("object");
//     });
//   });

//   describe("string", () => {
//     const entry = {
//       type: "string"
//     };
//     const walker = resolver.schemaTypeWalkerFor(entry);
//     test("is primitive walker", () => {
//       expect(walker.schemaType).toEqual("primitive");
//     });
//   });
// });
