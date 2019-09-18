import GridPlacer from "./GridPlacer";

describe("GridPlacer", () => {
  it("It can normlize a grid", () => {
    const result = GridPlacer.pad([
      { x: 1, y: 0, rotation: 0, id: "a", index: -1 },
      { x: 2, y: 0, rotation: 0, id: "b", index: -1 },
      { x: 3, y: 0, rotation: 0, id: "c", index: -1 },
      { x: 4, y: 0, rotation: 0, id: "d", index: -1 },
      { x: 1, y: 1, rotation: 0, id: "e", index: -1 },
      { x: 2, y: 1, rotation: 0, id: "f", index: -1 }
    ]);

    expect(result).toEqual([
      { x: 0, y: 0, rotation: 0, id: "a", index: 0 },
      { x: 1, y: 0, rotation: 0, id: "b", index: 1 },
      { x: 2, y: 0, rotation: 0, id: "c", index: 2 },
      { x: 3, y: 0, rotation: 0, id: "d", index: 3 },
      { x: 1, y: 1, rotation: 0, id: "e", index: 4 },
      { x: 2, y: 1, rotation: 0, id: "f", index: 5 }
    ]);
  });

  it("It can normlize a grid with non-single spaces", () => {
    const result = GridPlacer.pad([
      { x: 1, y: 0, rotation: 0, id: "a", index: -1 },
      { x: 1.5, y: 0, rotation: 0, id: "b", index: -1 },
      { x: 3, y: 0, rotation: 0, id: "c", index: -1 },
      { x: 4, y: 1, rotation: 0, id: "d", index: -1 },
      { x: 1, y: 1, rotation: 0, id: "e", index: -1 },
      { x: 2, y: 1, rotation: 0, id: "f", index: -1 }
    ]);

    expect(result).toEqual([
      { x: 0, y: 0, rotation: 0, id: "a", index: 0 },
      { x: 1, y: 0, rotation: 0, id: "b", index: 1 },
      { x: 2, y: 0, rotation: 0, id: "c", index: 2 },
      { x: 0, y: 1, rotation: 0, id: "d", index: 3 },
      { x: 1, y: 1, rotation: 0, id: "e", index: 4 },
      { x: 2, y: 1, rotation: 0, id: "f", index: 5 }
    ]);
  });

  it("It can normlize a grid without reset", () => {
    const result = GridPlacer.pad(
      [
        { x: 1, y: 0, rotation: 0, id: "a", index: -1 },
        { x: 1.5, y: 0, rotation: 0, id: "b", index: -1 },
        { x: 3, y: 0, rotation: 0, id: "c", index: -1 },
        { x: 4, y: 1, rotation: 0, id: "d", index: -1 },
        { x: 1, y: 1, rotation: 0, id: "e", index: -1 },
        { x: 2, y: 1.5, rotation: 0, id: "f", index: -1 }
      ],
      false
    );

    expect(result).toEqual([
      { x: 1, y: 0, rotation: 0, id: "a", index: 0 },
      { x: 1.5, y: 0, rotation: 0, id: "b", index: 1 },
      { x: 3, y: 0, rotation: 0, id: "c", index: 2 },
      { x: 4, y: 1, rotation: 0, id: "d", index: 3 },
      { x: 1, y: 1, rotation: 0, id: "e", index: 4 },
      { x: 2, y: 1.5, rotation: 0, id: "f", index: 5 }
    ]);
  });
});
