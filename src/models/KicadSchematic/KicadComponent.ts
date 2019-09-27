import cryptoRandomString from "crypto-random-string";
import { IDimension } from "../interfaces/iDimension";
import { IPoint, IPointRotated } from "../interfaces/iPoint";
import { KicadPeice } from "./KicadPeice";

export class KicadComponent {
  public lines: any = [];
  public uid: string = "";
  public newUid: string = "";
  public position: IPointRotated = { x: 0, y: 0, rotation: 0 };
  public rawLines: any;
  public hexPrefix: string;
  private keyWidth: number;
  constructor(
    rawlines: any = null,
    label: string = "1",
    position: IPointRotated = { x: -1, y: -1, rotation: 0 },
    gridSize: IDimension = { width: 1, height: 1 },
    uidPrefix: string = "",
    keyWidth: number = 1,
    neverReposition: boolean = false
  ) {
    this.keyWidth = keyWidth;
    this.hexPrefix = cryptoRandomString({ length: 4 });
    this.rawLines = rawlines;
    if (this.rawLines) {
      const uidLine = rawlines.find((x: string) => x.match(/U 1 1/));
      if (uidLine) {
        this.newUid = `${uidPrefix}${cryptoRandomString({ length: 4 })}`;
        this.uid = uidLine.replace(/U 1 1 /, "");
      }

      const positionLine = rawlines.find((x: string) => x.match(/P /));
      if (positionLine && neverReposition === false) {
        const rawPostitions = positionLine.replace(/P /, "");
        const positions = rawPostitions.split(/ /);
        this.position.x = Number.parseInt(positions[0], 10);
        this.position.y = Number.parseInt(positions[1], 10);
        if (positions.length > 2) {
          this.position.rotation = Number.parseInt(positions[2], 10);
        }
      }

      if (position.x > -1 && neverReposition === false) {
        this.setPosition(position, gridSize);
      }

      this.lines = rawlines.map((line: string) => {
        return new KicadPeice(
          line,
          this.position,
          label,
          this.uid,
          this.newUid,
          gridSize,
          this.keyWidth,
          neverReposition
        );
      });
    }
  }

  public updateLines(moveTo: IPoint) {
    this.position.x = moveTo.x;
    this.position.y = moveTo.y;
    this.lines.forEach((line: any) => {
      line.x = moveTo.x;
      line.y = moveTo.y;
    });
  }

  private setPosition(position: IPoint, gridSize: IDimension) {
    this.position.x = this.position.x + position.x * gridSize.width;
    this.position.y = this.position.y + position.y * gridSize.height;
  }
}
