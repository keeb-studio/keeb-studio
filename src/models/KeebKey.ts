import { Key } from "@ijprest/kle-serial";
import { Grid } from "./Grid";
export class KeebKey {
  label: string;
  kleKey: Key;
  gridIndex: Grid = new Grid();
  isSpacer: boolean = false;
  constructor(label: string, gridIndex: Grid, kleKey?: Key) {
    this.label = label;
    this.gridIndex = gridIndex;
    this.kleKey = kleKey || new Key();
  }
}
