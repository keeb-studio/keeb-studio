import { Section } from "./Section";
export class Module extends Section {
  public type: string;
  public originalPosition: string;
  public x: number;
  public y: number;
  public rotation: number;

  public originalX: number;
  public originalY: number;
  public positionIndex: number;
  constructor(lines: string[]) {
    super(lines);
    const nameLine = lines.find((line: string) => {
      return line.indexOf("fp_text reference") > -1;
    });

    this.name = "";
    if (nameLine) {
      const regex = /(?<=fp_text reference\ )(.*)(?=\ \(.*\()/;
      const name = nameLine.match(regex);
      if (name) {
        this.name = name[0].toString();
      }
    }

    const typeLine = lines.find((line: string) => {
      return line.indexOf("fp_text value") > -1;
    });

    this.type = "";
    if (typeLine) {
      const regex = /(?<=fp_text value\ )(.*)(?=\ \(.*\()/;
      const type = typeLine.match(regex);
      if (type) {
        this.type = type[0].toString();
      }
    }

    this.positionIndex = -1;
    const positionLine = lines.find((line: string, index: number) => {
      if (line.indexOf("(at ") > -1) {
        this.positionIndex = index;
        return true;
      } else {
        return false;
      }
    });

    this.originalPosition = "";
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    if (positionLine) {
      const regex = /(?<=\(at\ )(.*)(?=\))/;
      const originalPosition = positionLine.match(regex);
      if (originalPosition) {
        this.originalPosition = originalPosition[0].toString();
      }
      const positions = this.originalPosition.split(" ");
      this.x = Number.parseFloat(positions[0]);
      this.y = Number.parseFloat(positions[1]);
      if (positions.length > 2) {
        this.rotation = Number.parseFloat(positions[2]);
      }
    }
    this.originalX = this.x;
    this.originalY = this.y;
    if (this.rotation > 0) {
      this.lines[this.positionIndex] = "    (at xPos yPos rotation)";
    } else {
      this.lines[this.positionIndex] = "    (at xPos yPos)";
    }
  }

  public changeRotation(newRotation: number): void {
    this.rotation = newRotation;
    if (this.rotation > 0) {
      this.lines[this.positionIndex] = "    (at xPos yPos rotation)";
    } else {
      this.lines[this.positionIndex] = "    (at xPos yPos)";
    }
  }

  public render() {
    return this.lines
      .map((line: string, index: number) => {
        if (index === this.positionIndex) {
          let x = this.x.toFixed(2).toString();
          let y = this.y.toFixed(2).toString();

          const xParts = x.split(".");
          if (parseInt(xParts[1]) === 0) {
            x = xParts[0];
          }

          const yParts = y.split(".");
          if (parseInt(yParts[1]) === 0) {
            y = yParts[0];
          }

          return line
            .replace("xPos", x)
            .replace("yPos", y)
            .replace("rotation", this.rotation.toString());
        }
        return line;
      })
      .join("\n");
  }
}
