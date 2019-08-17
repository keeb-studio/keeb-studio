import KicadSchematic, { KicadComponent } from "./KicadSchematic";
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
      expect(schematic.sections()[1].type).toEqual("comp");
    });

    it("marks the first component", () => {
      expect(schematic.sections()[0].firstComponent).toEqual(false);
      expect(schematic.sections()[1].firstComponent).toEqual(true);
      expect(schematic.sections()[2].firstComponent).toEqual(false);
    });
  });

  describe("Component", () => {
    const component = new KicadComponent(schematic.sections()[1].lines);
    it("parses the uid", () => {
      expect(component.uid).toEqual("5D5FEB52");
    });

    it("parses the position", () => {
      expect(component.position).toEqual({ x: "1275", y: "1050" });
    });

    describe("lines", () => {
      it("find and tokenizes position", () => {
        //
        expect(component.lines[3]).toEqual({
          hasPosition: true,
          original: "P 1275 1050",
          x: 1275,
          y: 1050,
          template: "P templateX templateY"
        });
      });

      it("can update lines", () => {
        //when changing x and y
        component.lines[3].x = 123;
        component.lines[3].y = 456;
        // can update the line
        expect(component.lines[3].updatedLine()).toEqual("P 123 456");
      });
    });
  });
});
