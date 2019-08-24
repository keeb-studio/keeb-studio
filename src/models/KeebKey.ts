import { Key } from "@ijprest/kle-serial";
import { Grid } from "./Grid";
export class KeebKey {
  label: string = "";
  kleKey: Key;
  gridIndex: Grid = new Grid();
  constructor(key: string, gridIndex: Grid, kleKey?: Key) {
    this.label = key;
    this.gridIndex = gridIndex;
    this.kleKey = kleKey || new Key();
  }
}
