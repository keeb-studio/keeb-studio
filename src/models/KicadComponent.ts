import { KicadPeice } from "./KicadPeice";
export class KicadComponent {
  lines: any = [];
  public uid: string = "";
  public position: any = { x: 0, y: 0 };
  public rawLines: any;
  constructor(rawlines: any = null) {
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
      this.lines = rawlines.map((line: string) => {
        return new KicadPeice(line, this.position);
      });
    }
  }
}
