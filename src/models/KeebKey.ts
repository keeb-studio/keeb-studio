import { Key } from "@ijprest/kle-serial";
import { Grid } from "./Grid";
export class KeebKey {
  label: string;
  kleKey: Key;
  gridIndex: Grid = new Grid();
  isSpacer: boolean = false;
  index: number;
  constructor(label: string, gridIndex: Grid, index: number, kleKey?: Key) {
    this.label = label;
    this.gridIndex = gridIndex;
    this.kleKey = kleKey || new Key();
    this.index = index;
  }

  get x(): number {
    return this.kleKey.x;
  }

  get y(): number {
    return this.kleKey.y;
  }
}
