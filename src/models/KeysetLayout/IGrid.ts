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

export interface ISchematicKey {
  x: number;
  y: number;
  rotation: number;
  isSpacer: boolean;
  id: string;
  index: number;
}
