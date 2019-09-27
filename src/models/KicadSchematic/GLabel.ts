import { IPoint } from "../interfaces/iPoint";
export class GLabel {
  public lines: any = [];
  public uid: string = "wire";
  constructor(
    isCol: boolean,
    number: number,
    point: IPoint = { x: -1, y: -1 }
  ) {
    this.lines = [
      `Text GLabel ${point.x} ${point.y} ${isCol ? 3 : 2}    50   Input ~ 0 `,
      `${isCol ? "col" : "row"}${number}`
    ];
  }

  public updatedLine() {
    return this.lines;
  }
}
