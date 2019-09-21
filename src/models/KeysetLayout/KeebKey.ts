import { Key } from "@/LocalKleSerial";
import { Grid } from "./Grid";
export class KeebKey {
  public label: string;
  public kleKey: Key;
  public gridIndex: Grid = new Grid();
  public isSpacer: boolean = false;
  public index: number;
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
