import { readFileSync } from "fs";
import KicadPCBParser from "./KicadPCBParser";
describe("KicadPCB", () => {
  describe("getLines", () => {
    it("fines root lines", () => {
      const lines = [
        "(kicad_pcb (version 20171130) (host pcbnew \"(5.1.0)-1\")",
        "  (general",
        "    (thickness 1.6)",
        "    (drawings 0)",
        "    (tracks 0)",
        "    (zones 0)",
        "    (modules 2)",
        "    (nets 5)",
        "  )",
        ")",
        ""
      ];

      expect(KicadPCBParser.getLines(lines).lines).toEqual([
        "(kicad_pcb (version 20171130) (host pcbnew \"(5.1.0)-1\")",
        "section_0",
        ")",
        ""
      ]);
    });

    it("finds sections - simple", () => {
      const lines = [
        "(kicad_pcb (version 20171130) (host pcbnew \"(5.1.0)-1\")",
        "  (general",
        "    (thickness 1.6)",
        "    (drawings 0)",
        "    (tracks 0)",
        "    (zones 0)",
        "    (modules 2)",
        "    (nets 5)",
        "  )",
        ")",
        ""
      ];

      expect(KicadPCBParser.getLines(lines).sections).toEqual([
        [
          "  (general",
          "    (thickness 1.6)",
          "    (drawings 0)",
          "    (tracks 0)",
          "    (zones 0)",
          "    (modules 2)",
          "    (nets 5)",
          "  )"
        ]
      ]);
    });

    it("get sections - complex", () => {
      const fixture = "src/models/templates/kicad.pcb.tamplate.kicad_pcb";
      const raw = readFileSync(fixture, "utf8");
      const lines = KicadPCBParser.parseLines(raw);
      const result = KicadPCBParser.getLines(lines);
      // console.log(result.sections);
      expect(result.lines).toEqual([
        "(kicad_pcb (version 20171130) (host pcbnew \"(5.1.0)-1\")",
        "",
        "section_0",
        "  ",
        "section_1",
        "",
        "section_2",
        "",
        "section_3",
        "",
        "section_4",
        "",
        "section_5",
        "",
        "section_6",
        "",
        ")",
        ""
      ]);
    });
  });
});
