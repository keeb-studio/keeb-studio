import { readFileSync } from "fs";

export class KicadPeice {
  public original: string = "";
  public x: number = 0;
  public y: number = 0;
  public template: string = "";
  public hasPosition: boolean = false;
  constructor(original: string) {
    this.original = original;
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
        this.hasPosition = true;
        this.x = intDigits[xIndex];
        this.y = intDigits[xIndex + 1];
        this.template = original
          .replace(`${this.x}`, "templateX")
          .replace(`${this.y}`, "templateY");
      }
    }
  }

  public updatedLine() {
    return this.template
      .replace("templateX", this.x.toString())
      .replace("templateY", this.y.toString());
  }
}
export class KicadComponent {
  lines: any = [];
  public uid: string = "";
  public position: any = { x: 0, y: 0 };
  constructor(lines: any) {
    // console.log(lines);
    this.lines = lines.map((line: string) => {
      return new KicadPeice(line);
    });

    const uidLine = lines.find((x: string) => x.match(/U 1 1/));
    this.uid = uidLine.replace(/U 1 1 /, "");

    const positionLine = lines.find((x: string) => x.match(/P /));
    const rawPostitions = positionLine.replace(/P /, "");
    const positions = rawPostitions.split(/ /);
    this.position.x = positions[0];
    this.position.y = positions[1];
  }
}

export default class KicadSchematic {
  private path: string;
  rawFile: string;

  constructor(path: string = "") {
    this.path = path;
    this.rawFile = readFileSync(this.path, "utf8");
  }

  usedPath() {
    return this.path;
  }

  fileText() {
    return this.rawFile;
  }

  sections() {
    const lines = this.rawFile.split(/\r?\n/);
    const sections: any = [];
    let currentSection: any = [];
    let section: any;
    let closeSection = false;
    let firstComponent = false;
    let firstComponentFound = false;
    lines.forEach(line => {
      closeSection = false;
      if (line.match(/\$Descr/)) {
        section = "descr";
        firstComponent = false;
      } else if (line.match(/\$Comp/)) {
        if (firstComponentFound === false) {
          firstComponent = true;
          firstComponentFound = true;
        } else {
          firstComponent = false;
        }
        section = "comp";
      } else if (line.match(/\$EndDescr/)) {
        closeSection = true;
      } else if (line.match(/\$EndComp/)) {
        closeSection = true;
      }

      currentSection.push(line);
      if (closeSection) {
        sections.push({
          lines: currentSection,
          type: section,
          firstComponent,
          component:
            section === "comp" ? new KicadComponent(currentSection) : null
        });
        currentSection = [];
      }
    });
    return sections;
  }
}
