export default class KicadPCB {
  public lines?: Array<string>;

  public static parseTokens(content: string): Array<string> {
    // return flatMap(content.split(/\r?\n/), (line: string) => {
    //   line = line.replace(/#.*$/, "");
    //   return line.split(/([()]|"(?:\\"|[^"])*")|\s+/).filter(t => !!t);
    // }).filter(t => t.length > 0);
    return content.split(/\r?\n/);
  }

  public static getLines(lines: Array<string>): Foo {
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

interface Foo {
  lines: Array<string>;
  sections: Array<Array<string>>;
}

export const NEW_CONTEXT = "NEW_CONTEXT";
export const ADD_PROPERTY = "ADD_PROPERTY";
export const SET_PROPERTY = "SET_PROPERTY";
export const PUSH_PROPERTY = "PUSH_PROPERTY";
export const CLOSE_CONTEXT = "CLOSE_CONTEXT";
export const START = "START";

function flatMap<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U[]
): U[] {
  return Array.prototype.concat(...array.map(callbackfn));
}