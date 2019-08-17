import KicadSchematic from "./KicadSchematic";
describe("KicadSchematic", () => {
  const schematic = new KicadSchematic("tests/unit/fixtures/kicad.sch");
  describe("initialization", () => {
    it("can accept a file path", () => {
      expect(schematic.usedPath()).toEqual("tests/unit/fixtures/kicad.sch");
    });

    it("can read the file", () => {
      expect(schematic.fileText()).toEqual(
        expect.stringContaining("EESchema Schematic File")
      );
    });
  });

  describe("parsing", () => {
    it("can parse the sections", () => {
      expect(schematic.sections().length).toEqual(3);
      expect(schematic.sections()[0].type).toEqual("descr");
    });
  });
});
