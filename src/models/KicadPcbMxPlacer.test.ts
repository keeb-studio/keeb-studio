import KicadPcbMxPlacer from "./KicadPcbMxPlacer";

describe("KicadPcbPlacer", () => {
  it("can work", () => {
    const klePath = "tests/unit/fixtures/jack.json";
    const pcbPath = "src/models/templates/kicad.pcb.tamplate.kicad_pcb";
    const placer = new KicadPcbMxPlacer({
      pcbPath,
      klePath,
      outputPath: "temp"
    });
  });
});
