import { IPoint } from "../interfaces/iPoint";
export class WirePiece {
  public original: string = "";
  public templateOriginPosition: IPoint = { x: 0, y: 0 };
  public position1: IPoint;
  public position2: IPoint;
  constructor(original: string, position1: IPoint, position2: IPoint) {
    this.original = original;
    this.position1 = position1;
    this.position2 = position2;
  }
  public updatedLine() {
    const isLabel = this.original.indexOf("Wire") > -1;
    const wire = `\t${this.position1.x}  ${this.position1.y}  ${this.position2.x}  ${this.position2.y}`;
    return isLabel ? this.original : wire;
  }
}
