import GridPlacer from "./GridPlacer";

describe("GridPlacer", () => {
  it("It can normlize a grid", () => {
    const result = GridPlacer.pad([
      { x: 1, y: 1, rotation: 0 },
      { x: 2, y: 1, rotation: 0 },
      { x: 3, y: 1, rotation: 0 },
      { x: 4, y: 1, rotation: 0 },
      { x: 1, y: 2, rotation: 0 },
      { x: 2, y: 2, rotation: 0 }
    ]);

    expect(result).toEqual([
      { x: 1, y: 1, rotation: 0 },
      { x: 2, y: 1, rotation: 0 },
      { x: 3, y: 1, rotation: 0 },
      { x: 4, y: 1, rotation: 0 },
      { x: 2, y: 2, rotation: 0 },
      { x: 3, y: 2, rotation: 0 }
    ]);
  });
});
