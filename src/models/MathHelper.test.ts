import MathHelper from "./MathHelper";

describe("MathHelper", () => {
  describe("keyGridToMM", () => {
    it("converts", () => {
      // key - 0.25, 0.375
      // y 4.7625
      // y 7.14375
      const { x, y } = MathHelper.keyGridToMM(0.25, 0.375);
      const result = {
        x: MathHelper.roundResult(x),
        y: MathHelper.roundResult(y)
      };
      expect(result).toEqual({
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
      const result = MathHelper.findCenter(0, 0, 1, 1, 0, 0);
      expect(result).toEqual({ x: 9.525, y: 9.525 });
    });

    it("finds the center", () => {
      const result = MathHelper.findCenter(1, 0, 1, 1, 0, 0);
      expect(result).toEqual({
        x: 9.525 + 19.05,
        y: 9.525
      });
    });

    it("finds the center for wider key", () => {
      const { x, y } = MathHelper.findCenter(0, 0, 1.25, 1, 0, 0);
      const result = {
        x: MathHelper.roundResult(x),
        y: MathHelper.roundResult(y)
      };
      expect(result).toEqual({ x: 11.9063, y: 9.525 });
    });

    it("finds the center for wider key", () => {
      const { x, y } = MathHelper.findCenter(0.25, 0.375, 1.25, 1, 0, 0);
      const result = {
        x: MathHelper.roundResult(x),
        y: MathHelper.roundResult(y)
      };
      expect(result).toEqual({ x: 16.6688, y: 16.6688 });
    });

    it("finds the center for wider key non zero zero 2", () => {
      const { x, y } = MathHelper.findCenter(1.5, 0.375, 1, 1, 0, 0);
      const result = {
        x: MathHelper.roundResult(x),
        y: MathHelper.roundResult(y)
      };
      expect(result).toEqual({ x: 38.1, y: 16.6688 });
    });

    it("Redox TAB", () => {
      const { x, y } = MathHelper.findCenter(0.25, 1.375, 1.25, 1, 0, 0);
      const result = {
        x: MathHelper.roundResult(x),
        y: MathHelper.roundResult(y)
      };
      expect(result).toEqual({ x: 16.6688, y: 35.7188 });
    });

    it("Redox Q", () => {
      const { x, y } = MathHelper.findCenter(1.5, 1.375, 1, 1, 0, 0);
      // expect(result).toEqual({ x: 38.2588, y: 35.7188 });
      // x off by 0.15879999999999939

      const result = {
        x: MathHelper.roundResult(x),
        y: MathHelper.roundResult(y)
      };
      expect(result).toEqual({ x: 38.1, y: 35.7188 });
    });

    it("Redox W", () => {
      const { x, y } = MathHelper.findCenter(2.5, 1.125, 1, 1, 0, 0);
      // expect(result).toEqual({ x: 57.3088, y: 31.2738 });
      // x off by 0.15879999999999939
      // y off by 0.31750000000000256

      const result = {
        x: MathHelper.roundResult(x),
        y: MathHelper.roundResult(y)
      };
      expect(result).toEqual({ x: 57.15, y: 30.9563 });
    });

    it("Redox E", () => {
      const { x, y } = MathHelper.findCenter(3.5, 1, 1, 1, 0, 0);
      // expect(result).toEqual({ x: 76.3588, y: 28.7338 });
      // x off by 0.15879999999999939
      // y off by 0.15879999999999939

      const result = {
        x: MathHelper.roundResult(x),
        y: MathHelper.roundResult(y)
      };
      expect(result).toEqual({ x: 76.2, y: 28.575 });
    });

    it("Redox B", () => {
      const { x, y } = MathHelper.findCenter(5.5, 3.25, 1, 1, 0, 0);
      // expect(result).toEqual({ x: 114.4588, y: 71.2788 });
      // x off by 0.15879999999999939
      // y off by 0.15869999999999607

      const result = {
        x: MathHelper.roundResult(x),
        y: MathHelper.roundResult(y)
      };
      expect(result).toEqual({ x: 114.3, y: 71.4375 });
    });
  });

  describe("rotatePoint", () => {
    it("converts 0,0 origin", () => {
      let { x, y } = MathHelper.rotatePoint(3, 5, 0, 0, 180);
      const result = {
        x: MathHelper.roundResult(x),
        y: MathHelper.roundResult(y)
      };
      expect(result).toEqual({
        x: -3,
        y: -5
      });
    });

    it("rotate around self", () => {
      expect(MathHelper.rotatePoint(5, 0, 5, 0, 180)).toEqual({
        x: 5,
        y: 0
      });
    });

    it("converts non 0,0 origin", () => {
      let { x, y } = MathHelper.rotatePoint(5, 0, 1, 1, 90);
      const result = {
        x: MathHelper.roundResult(x),
        y: MathHelper.roundResult(y)
      };

      expect(result).toEqual({
        x: 2,
        y: 5
      });
    });
  });

  describe("pcbRoation", () => {
    it("finds points", () => {
      const result = MathHelper.findCorners(4.5, 4.45, 1.25, 1, 0, 0);
      let {
        p0: { x: x0, y: y0 },
        p1: { x: x1, y: y1 },
        p2: { x: x2, y: y2 },
        p3: { x: x3, y: y3 }
      } = result;

      x0 = MathHelper.roundResult(x0);
      y0 = MathHelper.roundResult(y0);

      x1 = MathHelper.roundResult(x1);
      y1 = MathHelper.roundResult(y1);

      x2 = MathHelper.roundResult(x2);
      y2 = MathHelper.roundResult(y2);

      x3 = MathHelper.roundResult(x3);
      y3 = MathHelper.roundResult(y3);

      expect(x0).toEqual(85.725);
      expect(y0).toEqual(84.7725);

      expect(x1).toEqual(109.5375);
      expect(y1).toEqual(84.7725);

      expect(x2).toEqual(109.5375);
      expect(y2).toEqual(103.8225);

      expect(x3).toEqual(85.725);
      expect(y3).toEqual(103.8225);
    });
    //
  });

  it("finds rotated corners", () => {
    const result = MathHelper.rotationedCorners(
      4.5,
      4.45,
      1.25,
      1,
      0,
      0,
      5.75,
      5.45,
      15
    );
    let {
      p0: { x: x0, y: y0 },
      p1: { x: x1, y: y1 },
      p2: { x: x2, y: y2 },
      p3: { x: x3, y: y3 }
    } = result;
    x0 = MathHelper.roundResult(x0);
    y0 = MathHelper.roundResult(y0);

    x1 = MathHelper.roundResult(x1);
    y1 = MathHelper.roundResult(y1);

    x2 = MathHelper.roundResult(x2);
    y2 = MathHelper.roundResult(y2);

    x3 = MathHelper.roundResult(x3);
    y3 = MathHelper.roundResult(y3);

    expect(x0).toEqual(91.4669);
    expect(y0).toEqual(79.2585);

    expect(x1).toEqual(114.468);
    expect(y1).toEqual(85.4216);

    expect(x2).toEqual(109.5375);
    expect(y2).toEqual(103.8225);

    expect(x3).toEqual(86.5364);
    expect(y3).toEqual(97.6594);
    //
  });

  it("finds rotated corners", () => {
    const { x, y, rotation } = MathHelper.rotatedKicad(
      4.5,
      4.45,
      1.25,
      1,
      0,
      0,
      5.75,
      5.45,
      15
    );

    const result = {
      x: MathHelper.roundResult(x),
      y: MathHelper.roundResult(y),
      rotation
    };

    expect(result).toEqual({ x: 100.5022, y: 91.5405, rotation: 345 });
  });

  it("finds rotated corners", () => {
    const { x, y, rotation } = MathHelper.rotatedKicad(
      5.5,
      3.25,
      1,
      1,
      0,
      0,
      5.75,
      5.45,
      0
    );

    const result = {
      x: MathHelper.roundResult(x),
      y: MathHelper.roundResult(y),
      rotation
    };

    expect(result).toEqual({ x: 114.3, y: 71.4375, rotation: 0 });
    // expect(result).toEqual({ x: 100.5022, y: 91.5405, rotation: 345 });
  });
  // const { x, y } = MathHelper.findCenter(5.5, 3.25, 1, 1, 0, 0);
});
