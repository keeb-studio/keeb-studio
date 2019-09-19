export interface IGrid {
  x: number;
  y: number;
}

export interface IGridRotated {
  x: number;
  y: number;
  rotation: number;
  id: string;
  index: number;
}

export interface IKey {
  height: number;
  id: string;
  index: number;
  rotation_angle: number;
  rotation_x: number;
  rotation_y: number;
  width: number;
  x: number;
  y: number;

  schematic_x: number;
  schematic_y: number;
  schematic_index: number;
}

export interface ISchematicKey {
  height: number;
  id: string;
  index: number;
  rotation_angle: number;
  rotation_x: number;
  rotation_y: number;
  width: number;
  x: number;
  y: number;
  normalX: number;
  normalY: number;
  pcbX: number;
  pcbY: number;
  pcbRotation: number;

  schematic_x: number;
  schematic_y: number;
  schematic_index: number;
}
