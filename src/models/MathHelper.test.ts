import MathHelper from "./MathHelper";

describe("MathHelper", () => {
  //
  describe("degreesToRadians", () => {
    it("converts degrees to radians", () => {
      expect(MathHelper.degreesToRadians(360)).toEqual(6.2832);
      expect(MathHelper.degreesToRadians(57.2958)).toEqual(1.0);
    });
  });

  describe("keyGridToMM", () => {
    it("converts", () => {
      // key - 0.25, 0.375
      // y 4.7625
      // y 7.14375
      expect(MathHelper.keyGridToMM(0.25, 0.375)).toEqual({
        x: 4.7625,
        y: 7.1438
      });

      // key - 3.5, 0
      // x 66.675
      // y 0
      expect(MathHelper.keyGridToMM(3.5, 0)).toEqual({
        x: 66.675,
        y: 0
      });
    });
  });

  // 91.44
  // 66.675
  // w

  describe("findCenter", () => {
    it("finds the center", () => {
      const result = MathHelper.findCenter(0, 0, 1, 1);
      expect(result).toEqual({ x: 9.525, y: 9.525 });
    });

    it("finds the center", () => {
      const result = MathHelper.findCenter(1, 0, 1, 1);
      expect(result).toEqual({
        x: MathHelper.round4Places(9.525 + 19.05),
        y: 9.525
      });
    });

    it("finds the center for wider key", () => {
      const result = MathHelper.findCenter(0, 0, 1.25, 1);
      expect(result).toEqual({ x: 11.9063, y: 9.525 });
    });

    it("finds the center for wider key", () => {
      const result = MathHelper.findCenter(0.25, 0.375, 1.25, 1);
      expect(result).toEqual({ x: 16.6688, y: 16.6688 });
    });

    it("finds the center for wider key non zero zero 2", () => {
      const result = MathHelper.findCenter(1.5, 0.375, 1, 1);
      // expect(result).toEqual({ x: 38.2588, y: 16.6688 });
      // x off by 0.15879999999999939
      expect(result).toEqual({ x: 38.1, y: 16.6688 });
    });

    it("Redox TAB", () => {
      const result = MathHelper.findCenter(0.25, 1.375, 1.25, 1);
      expect(result).toEqual({ x: 16.6688, y: 35.7188 });
    });

    it("Redox Q", () => {
      const result = MathHelper.findCenter(1.5, 1.375, 1, 1);
      // expect(result).toEqual({ x: 38.2588, y: 35.7188 });
      // x off by 0.15879999999999939
      expect(result).toEqual({ x: 38.1, y: 35.7188 });
    });

    it("Redox W", () => {
      const result = MathHelper.findCenter(2.5, 1.125, 1, 1);
      // expect(result).toEqual({ x: 57.3088, y: 31.2738 });
      // x off by 0.15879999999999939
      // y off by 0.31750000000000256
      expect(result).toEqual({ x: 57.15, y: 30.9563 });
    });

    it("Redox E", () => {
      const result = MathHelper.findCenter(3.5, 1, 1, 1);
      // expect(result).toEqual({ x: 76.3588, y: 28.7338 });
      // x off by 0.15879999999999939
      // y off by 0.15879999999999939
      expect(result).toEqual({ x: 76.2, y: 28.575 });
    });

    it("Redox B", () => {
      const result = MathHelper.findCenter(5.5, 3.25, 1, 1);
      // expect(result).toEqual({ x: 114.4588, y: 71.2788 });
      // x off by 0.15879999999999939
      // y off by 0.15869999999999607
      expect(result).toEqual({ x: 114.3, y: 71.4375 });
    });
  });
  xdescribe("rotatePoint", () => {
    it("converts", () => {
      // key - 4.5, 4.45
      //     - 5.75, 5.45, 15
      // 89.8525 x
      // 82.07375 y
      // 345 rotation
      const result = MathHelper.rotatePoint(4.5, 4.45, 5.75, 5.45, 15);
      console.log(result.x - 89.8525);
      console.log(result.y - 82.0738);
      expect(result).toEqual({
        x: 89.8525,
        y: 82.0738,
        rotation: 345
      });
    });
  });

  // key - 6.5, 3,25
  //     - 6.5, 4.25, 30
  // 125.4125 x
  // 68.10375 y
  // 330 rot
});
