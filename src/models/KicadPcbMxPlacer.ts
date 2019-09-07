import { readFileSync } from "fs";
import KeysetLayout from "./KeysetLayout/KeysetLayout";
import KicadPCB from "./KicadPCB/KicadPCB";

export default class KicadPcbMxPlacer {
  layout: KeysetLayout;
  pcb: KicadPCB;
  outputPath: string;
  constructor(params: iKicadPcbPlacer) {
    const kleRaw = readFileSync(params.klePath, "utf8");
    this.layout = new KeysetLayout({ raw: kleRaw });

    const pcbRaw = readFileSync(params.pcbPath, "utf8");
    this.pcb = new KicadPCB({ raw: pcbRaw, path: "" });
    this.outputPath = params.outputPath;
  }
}

interface iKicadPcbPlacer {
  pcbPath: string;
  klePath: string;
  outputPath: string;
}
