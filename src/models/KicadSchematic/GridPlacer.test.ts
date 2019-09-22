import GridPlacer from "./GridPlacer";

describe("GridPlacer", () => {
  it("It can calculate pcb positions", () => {
    const input = [
      {
        height: 1,
        id: "a",
        index: -1,
        rotation_angle: 0,
        rotation_x: 0,
        rotation_y: 0,
        width: 1,
        optionFor: null,
        x: 0,
        y: 1,
        schematic_index: -1,
        schematic_x: 0,
        schematic_y: 0
      },
      {
        height: 1,
        id: "a",
        index: -1,
        rotation_angle: 0,
        rotation_x: 0,
        rotation_y: 0,
        width: 1,
        optionFor: null,
        x: 0,
        y: 2,
        schematic_index: -1,
        schematic_x: 0,
        schematic_y: 1
      }
    ];
    const result = GridPlacer.pad(input);

    expect(result).toEqual([
      {
        ...input[0],
        normalX: 0,
        normalY: 0,
        optionFor: null,
        index: 0,
        pcbX: 9.525,
        pcbY: 28.575,
        pcbRotation: 0
      },
      {
        ...input[1],
        normalX: 0,
        normalY: 1,
        optionFor: null,
        index: 1,
        pcbX: 9.525,
        pcbY: 47.625,
        pcbRotation: 0
      }
    ]);
  });

  it("It can calculate pcb positions", () => {
    const input = [
      {
        height: 1,
        id: "a",
        index: -1,
        rotation_angle: 90,
        rotation_x: 2,
        rotation_y: 2,
        width: 2,
        optionFor: null,
        x: 1,
        y: 0,
        schematic_index: -1,
        schematic_x: 1,
        schematic_y: 0
      }
    ];
    const result = GridPlacer.pad(input);

    expect(result).toEqual([
      {
        ...input[0],
        x: 1,
        y: 0,
        normalX: 0,
        normalY: 0,
        optionFor: null,
        id: "a",
        index: 0,
        pcbX: 66.675,
        pcbY: 38.1,
        pcbRotation: 270
      }
    ]);
  });

  it("It can normlize a grid", () => {
    const input = [
      { x: 1, y: 0, id: "a", index: -1 } as any,
      { x: 2, y: 0, id: "b", index: -1 } as any,
      { x: 3, y: 0, id: "c", index: -1 } as any,
      { x: 4, y: 0, id: "d", index: -1 } as any,
      { x: 1, y: 1, id: "e", index: -1 } as any,
      { x: 2, y: 1, id: "f", index: -1 } as any
    ];
    const result = GridPlacer.pad(input);

    expect(result).toEqual([
      {
        ...input[0],
        x: 2,
        y: 1,
        normalX: 0,
        normalY: 0,

        optionFor: null,
        id: "f",
        index: 0,
        pcbRotation: 0,
        pcbX: 47.625,
        pcbY: 28.575
      },
      {
        ...input[1],
        x: 1,
        y: 1,
        normalX: 1,
        normalY: 0,

        optionFor: null,
        id: "e",
        index: 1,
        pcbRotation: 0,
        pcbX: 28.575,
        pcbY: 28.575
      },
      {
        ...input[2],
        x: 4,
        y: 0,
        normalX: 2,
        normalY: 0,
        optionFor: null,
        id: "d",
        index: 2,
        pcbRotation: 0,
        pcbX: 85.725,
        pcbY: 9.525
      },
      {
        ...input[3],
        x: 3,
        y: 0,
        normalX: 3,
        normalY: 0,
        optionFor: null,
        id: "c",
        index: 3,
        pcbRotation: 0,
        pcbX: 66.675,
        pcbY: 9.525
      },
      {
        ...input[4],
        x: 2,
        y: 0,
        normalX: 4,
        normalY: 0,
        optionFor: null,
        id: "b",
        index: 4,
        pcbRotation: 0,
        pcbX: 47.625,
        pcbY: 9.525
      },
      {
        ...input[5],
        x: 1,
        y: 0,
        normalX: 5,
        normalY: 0,
        optionFor: null,
        id: "a",
        index: 5,
        pcbRotation: 0,
        pcbX: 28.575,
        pcbY: 9.525
      }
    ]);
  });

  it("It can normlize a grid with non-single spaces", () => {
    const input = [
      { x: 1, y: 0, rotation_angle: 0, id: "a", index: -1 } as any,
      { x: 1.5, y: 0, rotation_angle: 0, id: "b", index: -1 },
      { x: 3, y: 0, rotation_angle: 0, id: "c", index: -1 },
      { x: 4, y: 1, rotation_angle: 0, id: "d", index: -1 },
      { x: 1, y: 1, rotation_angle: 0, id: "e", index: -1 },
      { x: 2, y: 1, rotation_angle: 0, id: "f", index: -1 }
    ];
    const result = GridPlacer.pad(input);

    expect(result).toEqual([
      {
        ...input[0],
        x: 2,
        y: 1,
        normalX: 0,
        normalY: 0,
        optionFor: null,
        id: "f",
        index: 0,
        pcbRotation: 0,
        pcbX: 47.625,
        pcbY: 28.575
      },
      {
        ...input[1],
        x: 1,
        y: 1,
        normalX: 1,
        normalY: 0,
        optionFor: null,
        id: "e",
        index: 1,
        pcbRotation: 0,
        pcbX: 28.575,
        pcbY: 28.575
      },
      {
        ...input[2],
        x: 4,
        y: 1,
        normalX: 2,
        normalY: 0,
        optionFor: null,
        id: "d",
        index: 2,
        pcbRotation: 0,
        pcbX: 85.725,
        pcbY: 28.575
      },
      {
        ...input[3],
        x: 3,
        y: 0,
        normalX: 3,
        normalY: 0,
        optionFor: null,
        id: "c",
        index: 3,
        pcbRotation: 0,
        pcbX: 66.675,
        pcbY: 9.525
      },
      {
        ...input[4],
        x: 1.5,
        y: 0,
        normalX: 4,
        normalY: 0,
        optionFor: null,
        id: "b",
        index: 4,
        pcbRotation: 0,
        pcbX: 38.1,
        pcbY: 9.525
      },
      {
        ...input[5],
        x: 1,
        y: 0,
        normalX: 5,
        normalY: 0,
        optionFor: null,
        id: "a",
        index: 5,
        pcbRotation: 0,
        pcbX: 28.575,
        pcbY: 9.525
      }
    ]);
  });

  describe("option for", () => {
    it("it will use option for pcb cords", () => {
      const key1 = {
        // gridIndex: { col: 2, row: 4 },
        height: 1,
        id: "id1",
        index: 65,
        optionFor: null,
        rotation_angle: 30,
        rotation_x: 5,
        rotation_y: 5,
        schematic_index: 2,
        schematic_x: 0,
        schematic_y: 0,
        width: 2.75,
        x: 0,
        y: 0
      } as any;

      const key2 = {
        height: 1,
        id: "id2",
        index: -1,
        optionFor: key1,
        rotation_angle: 0,
        rotation_x: 0,
        rotation_y: 0,
        schematic_index: -1,
        schematic_x: 0,
        schematic_y: 1,
        width: 1,
        x: 0,
        y: 1
      };

      const key3 = {
        // gridIndex: { col: 2, row: 4 },
        height: 1,
        id: "id3",
        index: 65,
        optionFor: null,
        rotation_angle: 30,
        rotation_x: 5,
        rotation_y: 5,
        schematic_index: 2,
        schematic_x: 0,
        schematic_y: 1,
        width: 2.75,
        x: 0,
        y: 2
      };
      const input = [key1, key2, key3];
      const result = GridPlacer.pad(input);

      expect(result[0]).toEqual({
        ...input[0],
        normalX: 0,
        normalY: 0,
        id: "id1",
        index: 0,
        pcbX: 78.308,
        pcbY: -13.5182,
        pcbRotation: 330,
        optionFor: null,
        schematic_x: 0,
        schematic_y: 0
      });

      expect(result[1]).toEqual({
        ...input[2],
        normalX: 0,
        normalY: 1,
        id: "id3",
        index: 1,
        pcbX: 59.258,
        pcbY: 19.4774,
        pcbRotation: 330,
        optionFor: null,
        schematic_x: 0,
        schematic_y: 1
      });

      expect(result[2]).toEqual({
        ...input[1],
        normalX: 0,
        normalY: 2,
        id: "id2",
        index: 2,
        pcbX: 63.8725,
        pcbY: -21.8525,
        pcbRotation: 330,
        optionFor: key1,
        schematic_x: 0,
        schematic_y: 1
      });
    });
  });
});
