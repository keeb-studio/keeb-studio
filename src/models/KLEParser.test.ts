import KLEParser from "./KLEParser";

describe("KLEParser", () => {
  describe(".parse", () => {
    it("returns an empty array", () => {
      const k = new KLEParser("");
      expect(k.parse()).toEqual([]);
    });

    it("handles a single key", () => {
      const k = new KLEParser(`["a"]`);
      expect(k.parse()).toEqual([
        {
          width: 1,
          height: 1,
          x: 0,
          y: 0
        }
      ]);
    });
  });
});
