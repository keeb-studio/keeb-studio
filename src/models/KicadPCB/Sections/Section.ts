export class Section {
  public lines: Array<string>;

  constructor(lines: Array<string>) {
    this.lines = lines;
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