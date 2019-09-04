export default class KicadPCBParser {
  public static getLinesFromContent(content: string): Pcb {
    const lines = this.parseLines(content);
    return this.getLines(lines);
  }

  public static parseLines(content: string): Array<string> {
    // return flatMap(content.split(/\r?\n/), (line: string) => {
    //   line = line.replace(/#.*$/, "");
    //   return line.split(/([()]|"(?:\\"|[^"])*")|\s+/).filter(t => !!t);
    // }).filter(t => t.length > 0);
    return content.split(/\r?\n/);
  }

  public static getLines(lines: Array<string>): Pcb {
    const rootLines: Array<string> = [];
    const sections: Array<Array<string>> = [];
    let currentSection: Array<string> = [];

    let openCount = 0;
    let closeCount = 0;
    let level = 0;
    let root = true;
    let lastRoot = true;

    lines.forEach((line: string, index: number) => {
      openCount = openCount + (line.match(/\(/g) || []).length;
      level = openCount - closeCount;
      closeCount = closeCount + (line.match(/\)/g) || []).length;
      lastRoot = root;
      root = index === 0 || level <= 1;

      const rootChange = root !== lastRoot;

      if (rootChange && index > 0) {
        if (currentSection.length > 0) {
          rootLines.push(`section_${sections.length}`);
          sections.push(currentSection);
        }
        currentSection = [];
      }

      if (root) {
        rootLines.push(line);
      } else {
        currentSection.push(line);
      }
    });

    return {
      lines: rootLines,
      sections
    };
  }
}

interface Pcb {
  lines: Array<string>;
  sections: Array<Array<string>>;
}
