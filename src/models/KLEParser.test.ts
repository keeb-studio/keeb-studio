import KLEParser from "./KLEParser";

describe("KLEParser", () => {
  describe(".parse", () => {
    it("handles a single key", () => {
      const k = new KLEParser(`[["a"]]`);
      const keys = k.parse().keys;
      expect(keys.length).toEqual(1);
      expect(keys[0].x).toEqual(0);
      expect(keys[0].y).toEqual(0);
      expect(keys[0]).toEqual({
        color: "#cccccc",
        decal: false,
        default: { textColor: "#000000", textSize: 3 },
        ghost: false,
        height: 1,
        height2: 1,
        labels: ["a"],
        nub: false,
        profile: "",
        rotation_angle: 0,
        rotation_x: 0,
        rotation_y: 0,
        sb: "",
        sm: "",
        st: "",
        stepped: false,
        textColor: [],
        textSize: [],
        width: 1,
        width2: 1,
        x: 0,
        x2: 0,
        y: 0,
        y2: 0
      });
    });
  });
});
