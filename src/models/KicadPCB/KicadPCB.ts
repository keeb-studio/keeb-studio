import KicadPCBParser from "./KicadPCBParser";
import SectionFactory from "./Sections/Factory";
import { Module } from "./Sections/Module";
import { Section } from "./Sections/Section";

const gridSize = 19.05;

export default class KicadPCB {
  public rawLines: string[] = [];
  public rawSections: string[][] = [];
  // private
  // initial position (x and y to use as 0,0)
  // mxwidth in mm (19.05)
  public sections: any[] = [];
  public xDiodeDiff: number;
  public yDiodeDiff: number;
  public initialDiodeRotation: number = 0;

  constructor(params: IKicadPCBConstructorParams) {
    const { raw, path } = params;
    if (raw) {
      const linesAndSections = KicadPCBParser.getLinesFromContent(raw);
      this.rawLines = linesAndSections.lines;
      this.rawSections = linesAndSections.sections;
      // const sections = SectionFactory.getSection(this.)
      const sections = this.rawSections.map((section: string[]) =>
        SectionFactory.getSection(section)
      );
      this.sections = sections;
    }
    const mxInit = this.findByName("MX0");
    const diodeInit = this.findByName("D0");

    this.initialDiodeRotation = diodeInit.rotation;
    this.xDiodeDiff = diodeInit.x - mxInit.x;
    this.yDiodeDiff = diodeInit.y - mxInit.y;
  }

  public findByName(name: string): Module {
    const found = this.sections.find((section: Section) => {
      return section.name === name;
    });
    if (found) {
      return found;
    }
    throw new Error(`${name} Not Found`);
  }

  public position(mxIndex: number, gridX: number, gridY: number) {
    const mx = this.findByName(`MX${mxIndex}`);
    const diode = this.findByName(`D${mxIndex}`);
    mx.x = gridX;
    mx.y = gridY;
    diode.x = mx.x + this.xDiodeDiff;
    diode.y = mx.y + this.yDiodeDiff;
    diode.changeRotation(this.initialDiodeRotation);
  }

  public positionSwitch(mxIndex: number, gridX: number, gridY: number) {
    const mx = this.findByName(`MX${mxIndex}`);
    const diode = this.findByName(`D${mxIndex}`);
    mx.x = gridX * gridSize;
    mx.y = gridY * gridSize;
    diode.x = mx.x + this.xDiodeDiff;
    diode.y = mx.y + this.yDiodeDiff;
  }

  public render(): string {
    return this.rawLines
      .map((line: string) => {
        const isSection = line.indexOf("section_") === 0;
        if (isSection) {
          const sectionIndex = parseInt(line.replace("section_", ""), 10);
          return this.sections[sectionIndex].render();
        }
        return line;
      })
      .join("\n");
  }
}

interface IKicadPCBConstructorParams {
  path: string;
  raw: string;
}
