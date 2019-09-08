import * as KicadPCB from "./KicadNameSpace";
export default class SectionFactory {
  public static getSection(lines: string[]) {
    const line = lines[0];
    if (line.indexOf("general") > -1) {
      return new KicadPCB.General(lines);
    }

    if (line.indexOf("module") > -1) {
      return new KicadPCB.Module(lines);
    }
    // if (line.indexOf(SectionType.Page)) {
    //   return SectionType.Page;
    // }
    // if (line.indexOf(SectionType.Layers)) {
    //   return SectionType.Layers;
    // }
    // if (line.indexOf(SectionType.Setup)) {
    //   return SectionType.Setup;
    // }
    // if (line.indexOf(SectionType.Net)) {
    //   return SectionType.Net;
    // }
    // if (line.indexOf(SectionType.NetClass)) {
    //   return SectionType.NetClass;
    // }
    // if (line.indexOf(SectionType.Module)) {
    //   return SectionType.Module;
    // }
    return new KicadPCB.Section(lines);
  }
}
