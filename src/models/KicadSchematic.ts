import { readFileSync } from "fs";
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
    lines.forEach(line => {
      closeSection = false;
      if (line.match(/\$Descr/)) {
        section = "descr";
      } else if (line.match(/\$Comp/)) {
        section = "comp";
      } else if (line.match(/\$EndDescr/)) {
        closeSection = true;
      } else if (line.match(/\$EndComp/)) {
        closeSection = true;
      }

      currentSection.push(line);
      if (closeSection) {
        sections.push({ lines: currentSection, type: section });
        currentSection = [];
      }
    });
    return sections;
  }
}
