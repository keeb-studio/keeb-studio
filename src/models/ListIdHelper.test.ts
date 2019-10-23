import { GetNextId } from "./ListIdHelper";

describe("ListIdHelper", () => {
  describe("GetNextId", () => {
    it("returns the next id", () => {
      const list = [{ id: 1 }];
      expect(GetNextId(list)).toEqual(2);
    });

    it("return first gap for list", () => {
      const list = [{ id: 1 }, { id: 2 }];
      expect(GetNextId(list)).toEqual(3);
    });

    it("return first gap for list not starting with 1", () => {
      const list = [{ id: 2 }, { id: 3 }];
      expect(GetNextId(list)).toEqual(1);
    });

    it("return first gap for list not starting with and mid gap", () => {
      const list = [{ id: 2 }, { id: 4 }];
      expect(GetNextId(list)).toEqual(1);
    });

    it("return first gap for list not starting with and mid gap non 1", () => {
      const list = [{ id: 3 }, { id: 4 }];
      expect(GetNextId(list)).toEqual(2);
    });

    it("return first gap", () => {
      const list = [{ id: 1 }, { id: 3 }];
      expect(GetNextId(list)).toEqual(2);
    });

    it("return first gap when double gap", () => {
      const list = [{ id: 1 }, { id: 4 }];
      expect(GetNextId(list)).toEqual(2);
    });

    it("handles non ordered list", () => {
      const list = [{ id: 4 }, { id: 1 }];
      expect(GetNextId(list)).toEqual(2);
    });
  });
});
