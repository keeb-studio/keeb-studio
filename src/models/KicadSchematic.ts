import { readFileSync } from "fs";

interface iPoint {
  x: Number;
  y: Number;
}
export class KicadPeice {
  public original: string = "";
  public originPosition: iPoint = { x: 0, y: 0 };
  public x: number = 0;
  public y: number = 0;
  public xOffset: number = 0;
  public yOffset: number = 0;
  public template: string = "";
  public hasPosition: boolean = false;
  hasDigits: boolean = false;
  constructor(original: string, originPosition: iPoint) {
    this.original = original;
    this.originPosition = originPosition;
    const digitsRegex = /\ \d+/g;
    const digits = original.match(digitsRegex);

    const partType = original.charAt(0);
    if (digits) {
      //convert digitis to ints
      const intDigits = digits.map((x: string) => Number.parseInt(x));

      // find out if we need to ignore it because
      // it doesn't actually have x & y in it
      let ignore = true;
      if (["P", "F", "D"].includes(partType)) {
        ignore = false;
      }
      if (
        !["P", "F", "D", "U"].includes(partType) &&
        intDigits[0] !== 0 &&
        intDigits[1] !== 0
      ) {
        ignore = false;
      }

      // determine which numbers are x and y
      let xIndex = 0;
      if (partType === "F") {
        xIndex = 1;
      }

      if (!ignore) {
        this.hasDigits = true;
        this.hasPosition = true;
        this.x = intDigits[xIndex];
        this.y = intDigits[xIndex + 1];

        //TODO wtf type script why do I need to use contructor?
        // interface already says this is a number?
        // is it because it could be assigned something else?
        this.xOffset = this.x - Number(originPosition.x);
        this.yOffset = this.y - Number(originPosition.y);

        this.template = original
          .replace(`${this.x}`, "templateX")
          .replace(`${this.y}`, "templateY");
      }
    } else {
      this.hasDigits = false;
    }
  }

  public updatedLine() {
    const newX = Number(this.originPosition.x) + this.xOffset;
    const newY = Number(this.originPosition.y) + this.yOffset;
    return this.hasDigits
      ? this.template
          .replace("templateX", newX.toString())
          .replace("templateY", newY.toString())
      : this.original;
  }
}
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
export class KicadWire {
  lines: any = [];
  public uid: string = "";
  public position: any = { x: 0, y: 0 };
  public position2: any = { x: 0, y: 0 };
  public rawLines: any;
  constructor(rawlines: any = null, adjustment: iPoint = { x: 0, y: 0 }) {
    this.rawLines = rawlines;

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

export default class KicadSchematic {
  private path: string;
  rawFile: string;
  public sections: Array<any> = [];
  public switchTemplate: KicadComponent;
  public diodeTemplate: KicadComponent;
  public wires: Array<any> = [];
  constructor(path: string = "") {
    this.path = path;
    this.rawFile = readFileSync(this.path, "utf8");

    const lines = this.rawFile.split(/\r?\n/);
    const sections: any = [];
    let currentSection: any = [];
    let section: any;
    let closeSection = false;
    let firstComponent = false;
    let firstComponentFound = false;
    let switchTemplate = new KicadComponent();
    let diodeTemplate = new KicadComponent();
    let lastWasWire = false;
    lines.forEach(line => {
      closeSection = false;

      if (lastWasWire) {
        closeSection = true;
        section = "wire";
        lastWasWire = false;
      } else if (line.match(/\$Descr/)) {
        section = "descr";
        firstComponent = false;
        lastWasWire = false;
      } else if (line.match(/\$Comp/)) {
        if (firstComponentFound === false) {
          firstComponent = true;
          firstComponentFound = true;
        } else {
          firstComponent = false;
        }
        lastWasWire = false;
        section = "comp";
      } else if (line.match(/\$EndDescr/)) {
        lastWasWire = false;
        closeSection = true;
      } else if (line.match(/\$EndComp/)) {
        lastWasWire = false;
        closeSection = true;
      } else if (line.match(/Wire Wire Line/)) {
        section = "wire";
        lastWasWire = true;
      } else if (line.match(/\$EndSCHEMATC/)) {
        lastWasWire = false;
        section = "closing";
        closeSection = true;
      }

      currentSection.push(line);
      if (closeSection) {
        let component = null;

        if (section === "comp") {
          component = new KicadComponent(currentSection);
        } else if (section === "wire") {
          component = new KicadWire(currentSection);
        }

        sections.push({
          lines: currentSection,
          type: section,
          firstComponent,
          component
        });
        const label = currentSection[1];
        if (
          switchTemplate.uid === "" &&
          section === "comp" &&
          label.indexOf("MX") > -1
        ) {
          switchTemplate = new KicadComponent(currentSection);
        }
        if (
          switchTemplate.uid === "" &&
          section === "comp" &&
          label.indexOf("D_Small") > -1
        ) {
          diodeTemplate = new KicadComponent(currentSection);
        }
        currentSection = [];
      }
    });

    this.switchTemplate = switchTemplate;
    this.diodeTemplate = diodeTemplate;
    this.sections = sections;
  }

  usedPath() {
    return this.path;
  }

  fileText() {
    return this.rawFile;
  }

  render() {
    // have to add back a newline
    return [
      ...flatMap(this.sections, (x: any) => {
        return x.component === null
          ? x.lines
          : x.component.lines.map((x: any) => {
              return x.updatedLine();
            });
      }),
      ""
    ].join("\n");
  }

  findComponentById(id: string) {
    const found = this.sections.find((x: any) => {
      return x.component !== null && x.component.uid === id;
    });
    if (found) {
      return found.component;
    }
    throw new Error(`component with id:${id} not found`);
  }
}

export function flatMap<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U[]
): U[] {
  return Array.prototype.concat(...array.map(callbackfn));
}
