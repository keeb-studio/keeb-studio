import { readFileSync } from "fs";

export class KicadComponent {
  lines: any = [];
  public uid: string = "";
  public position: any = { x: 0, y: 0 };
  constructor(lines: any) {
    console.log(lines);
    this.lines = lines;

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
