import { readFileSync } from "fs";
import KicadPCB from "./KicadPCB";

export default class KicadPcbMxPlacer {
  public pcb: KicadPCB;
  public outputPath: string;
  constructor(params: IKicadPcbPlacer) {
    const pcbRaw = readFileSync(params.pcbPath, "utf8");
    this.pcb = new KicadPCB({ raw: pcbRaw, path: "" });
    this.outputPath = params.outputPath;
  }
}

interface IKicadPcbPlacer {
  pcbPath: string;
  outputPath: string;
}
