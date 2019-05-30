import { ObjectEntryWalker } from "../ObjectEntryWalker";
import { buildConfig } from "../config";

describe("ObjectEntryWalker", () => {
  function createWalker(config = {}) {
    return new ObjectEntryWalker(buildConfig(config));
  }

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

    const walker = createWalker();
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

  test("array property", () => {
    const obj = {
      title: "person",
      type: "object",
      properties: {
        friends: {
          type: "array",
          items: {
            type: "object",
            propertyNames: ["name"],
            properties: {
              name: {
                type: "string",
              },
            },
          },
        },
      },
    };

    const walker = createWalker();
    const arrayCb = entry => {
      expect(entry).toBe(obj.properties.friends);
    };
    const objectCb = jest.fn();
    const stringCb = entry => {
      expect(entry).toBe(obj.properties.friends.items.properties.name);
    };

    walker.walk(obj, {
      array: {
        enter: arrayCb,
        exit: arrayCb,
      },
      object: {
        enter: objectCb,
        exit: objectCb,
      },
      string: {
        enter: stringCb,
        exit: stringCb,
      },
    });

    expect(objectCb.mock.calls.length).toBe(4);
    expect(objectCb.mock.calls[1][0]).toBe(obj.properties.friends.items);
  });
});
