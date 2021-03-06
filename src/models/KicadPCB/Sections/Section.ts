export class Section {
  public lines: string[];
  public name: string = "";
  constructor(lines: string[]) {
    this.lines = lines;
  }

  public render() {
    return this.lines.join("\n");
  }
}

// export enum SectionType {
//   General = "general",
//   Page = "page",
//   Layers = "layers",
//   Setup = "setup",
//   Net = "net",
//   NetClass = "net_class",
//   Module = "module",
//   Unknown = "unknown"
// }
