import { iDimension } from "./iDimension";
import { iPoint } from "./iPoint";
import { KicadPeice } from "./KicadPeice";
export class KicadComponent {
  lines: any = [];
  public uid: string = "";
  public position: iPoint = { x: 0, y: 0 };
  public rawLines: any;
  constructor(
    rawlines: any = null,
    position: iPoint = { x: -1, y: -1 },
    gridSize: iDimension = { width: 1, height: 1 }
  ) {
    this.rawLines = rawlines;
    if (this.rawLines) {
      const uidLine = rawlines.find((x: string) => x.match(/U 1 1/));
      if (uidLine) {
        this.uid = uidLine.replace(/U 1 1 /, "");
      }
      const positionLine = rawlines.find((x: string) => x.match(/P /));
      if (positionLine) {
        const rawPostitions = positionLine.replace(/P /, "");
        const positions = rawPostitions.split(/ /);
        this.position.x = Number.parseInt(positions[0]);
        this.position.y = Number.parseInt(positions[1]);
      }

      if (position.x > -1) {
        this.setPosition(position, gridSize);
      }

      this.lines = rawlines.map((line: string) => {
        return new KicadPeice(line, this.position);
      });
    }
  }

  private setPosition(position: iPoint, gridSize: iDimension) {
    this.position.x =
      Number(this.position.x) + Number(position.x) * Number(gridSize.width);
    this.position.y =
      Number(this.position.y) + Number(position.y) * Number(gridSize.height);
  }
}
