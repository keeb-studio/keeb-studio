import KicadPCBParser from "./KicadPCBParser";

export default class KicadPCB {
  lines: Array<string> = [];
  sections: Array<Array<string>> = [];
  // public
  // position components
  // render

  // private
  // initial position (x and y to use as 0,0)
  // mxwidth in mm (19.05)

  constructor(params: iKicadPCBConstructorParams) {
    const { raw, path } = params;
    if (raw) {
      const linesAndSections = KicadPCBParser.getLinesFromContent(raw);
      this.lines = linesAndSections.lines;
      this.sections = linesAndSections.sections;
    }
  }

  public render(): string {
    return this.lines
      .map((line: string) => {
        const isSection = line.indexOf("section_") === 0;
        if (isSection) {
          const sectionIndex = parseInt(line.replace("section_", ""));
          return this.sections[sectionIndex].join("\n");
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
