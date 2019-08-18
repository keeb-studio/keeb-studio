import { iPoint } from "./iPoint";
import { WirePiece } from "./WirePiece";
export class KicadWire {
  lines: any = [];
  public uid: string = "wire";
  public position: any = { x: 0, y: 0 };
  public position2: any = { x: 0, y: 0 };
  public rawLines: any;
  constructor(
    rawlines: any = null,
    point1: iPoint = { x: -1, y: -1 },
    point2: iPoint = { x: -1, y: -1 }
  ) {
    // this allows us to get  a wire just based on points instead of being parsed from
    // the kicad schematic
    if (point1.x > -1) {
      rawlines = [
        "Wire Wire Line",
        `\t${point1.x}  ${point1.y} ${point2.x} ${point2.y}`
      ];
    }
    this.rawLines = rawlines;
    if (rawlines !== null) {
      const positionLine = rawlines[1];

      if (positionLine) {
        const rawPostitions = positionLine.replace("\t", "");
        const positions = rawPostitions.split(/ /).filter((x: any) => x != "");
        this.position.x = Number.parseInt(positions[0]);
        this.position.y = Number.parseInt(positions[1]);
        this.position2.x = Number.parseInt(positions[2]);
        this.position2.y = Number.parseInt(positions[3]);
      }

      this.lines = rawlines.map((line: string) => {
        return new WirePiece(line, this.position, this.position2);
      });
    }
  }
}
