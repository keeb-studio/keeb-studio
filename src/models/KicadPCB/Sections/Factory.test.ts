import SectionFactory from "./Factory";
import { General } from "./General";

describe("KicadPCBSection", () => {
  describe("ctor", () => {
    it("it can initialize", () => {
      const lines = [
        "  (general",
        "    (thickness 1.6)",
        "    (drawings 0)",
        "    (tracks 0)",
        "    (zones 0)",
        "    (modules 2)",
        "    (nets 5)",
        "  )"
      ];
      const foo = SectionFactory.getSection(lines);
      expect(foo instanceof General).toBe(true);
    });
  });
});
