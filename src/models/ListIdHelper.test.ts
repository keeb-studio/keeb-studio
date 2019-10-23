import { getNextId } from "./ListIdHelper";

describe("ListIdHelper", () => {
  describe("getNextId", () => {
    it("returns the next id", () => {
      const list = [{ id: 0 }];
      expect(getNextId(list)).toEqual(1);
    });

    it("return first gap for list", () => {
      const list = [{ id: 0 }, { id: 1 }];
      expect(getNextId(list)).toEqual(2);
    });

    it("return first gap for list not starting with 1", () => {
      const list = [{ id: 2 }, { id: 3 }];
      expect(getNextId(list)).toEqual(1);
    });

    it("return first gap for list not starting with and mid gap", () => {
      const list = [{ id: 2 }, { id: 4 }];
      expect(getNextId(list)).toEqual(1);
    });

    it("return first gap for list not starting with and mid gap non 1", () => {
      const list = [{ id: 3 }, { id: 4 }];
      expect(getNextId(list)).toEqual(2);
    });

    it("return first gap", () => {
      const list = [{ id: 0 }, { id: 2 }];
      expect(getNextId(list)).toEqual(1);
    });

    it("return first gap when double gap", () => {
      const list = [{ id: 0 }, { id: 3 }];
      expect(getNextId(list)).toEqual(1);
    });

    it("handles non ordered list", () => {
      const list = [{ id: 3 }, { id: 0 }];
      expect(getNextId(list)).toEqual(1);
    });
  });
});
