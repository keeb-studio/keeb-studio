import { iPoint } from "./iPoint";
export class WirePiece {
  public original: string = "";
  public originPosition: iPoint = { x: 0, y: 0 };
  position1: iPoint;
  position2: iPoint;
  constructor(original: string, position1: iPoint, position2: iPoint) {
    this.original = original;
    this.position1 = position1;
    this.position2 = position2;
  }
  public updatedLine() {
    const isLabel = this.original.indexOf("Wire") > -1;
    const wire = `\t${this.position1.x}  ${this.position1.y}  ${
      this.position2.x
    } ${this.position2.y}`;
    return isLabel ? this.original : wire;
  }
}
