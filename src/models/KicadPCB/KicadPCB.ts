import KicadPCBParser from "./KicadPCBParser";
import SectionFactory from "./Sections/Factory";

export default class KicadPCB {
  rawLines: Array<string> = [];
  rawSections: Array<Array<string>> = [];
  // public
  // position components
  // render

  // private
  // initial position (x and y to use as 0,0)
  // mxwidth in mm (19.05)
  sections: Array<any> = [];
  constructor(params: iKicadPCBConstructorParams) {
    const { raw, path } = params;
    if (raw) {
      const linesAndSections = KicadPCBParser.getLinesFromContent(raw);
      this.rawLines = linesAndSections.lines;
      this.rawSections = linesAndSections.sections;
      // const sections = SectionFactory.getSection(this.)
      const sections = this.rawSections.map((section: Array<string>) =>
        SectionFactory.getSection(section)
      );
      this.sections = sections;
    }
  }

  public render(): string {
    return this.rawLines
      .map((line: string) => {
        const isSection = line.indexOf("section_") === 0;
        if (isSection) {
          const sectionIndex = parseInt(line.replace("section_", ""));
          return this.rawSections[sectionIndex].join("\n");
        }
        return line;
      })
      .join("\n");
  }
}

interface iKicadPCBConstructorParams {
  path: string;
  raw: string;
}
