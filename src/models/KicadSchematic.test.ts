import { readFileSync } from "fs";
import KicadSchematic from "./KicadSchematic";

describe("KicadSchematic", () => {
  const fixture = "tests/unit/fixtures/kicad.sch";
  const schematic = new KicadSchematic(fixture);
  const firstMXid = "5D5FEB52";
  const firstMXid2 = "5D57639E";
  const firstDiodeid = "5D5F5496";
  describe("initialization", () => {
    it("can accept a file path", () => {
      expect(schematic.path).toEqual("tests/unit/fixtures/kicad.sch");
    });

    it("can read the file", () => {
      expect(schematic.rawFile).toEqual(
        expect.stringContaining("EESchema Schematic File")
      );
    });
  });

  describe("parsing", () => {
    it("can parse the sections", () => {
      // one for each component
      // + 1 for the meta info
      // + 1 for the wire
      // + 1 for the closing
      expect(schematic.sections[0].type).toEqual("descr");
      expect(schematic.sections[1].type).toEqual("comp");
      expect(schematic.sections[2].type).toEqual("comp");
      expect(schematic.sections[3].type).toEqual("comp");
      expect(schematic.sections[4].type).toEqual("wire");
      expect(schematic.sections[5].type).toEqual("closing");
      expect(schematic.sections.length).toEqual(6);
    });

    it("marks the first component", () => {
      expect(schematic.sections[0].firstComponent).toEqual(false);
      expect(schematic.sections[1].firstComponent).toEqual(true);
      expect(schematic.sections[2].firstComponent).toEqual(false);
    });

    it("finds the first mx switch component as switchTemplate", () => {
      expect(schematic.switchTemplate.uid).toEqual(firstMXid);
    });

    it("finds the 2nd mx switch component as switchTemplate", () => {
      expect(schematic.switchTemplate2.uid).toEqual(firstMXid2);
    });
    it("finds the first diode component as diodeTemplate", () => {
      expect(schematic.diodeTemplate.uid).toEqual(firstDiodeid);
    });
  });

  describe("render", () => {
    describe("when nothing changes", () => {
      it("will render without modifications to original", () => {
        const original = readFileSync(fixture, "utf8");
        expect(schematic.render()).toEqual(original);
      });
    });
  });

  describe("findById", () => {
    it("will find a component by id", () => {
      expect(schematic.findComponentById(firstMXid).uid).toEqual(firstMXid);
    });
  });

  describe("place wire", () => {
    const mx = schematic.findComponentById(firstMXid);
    const diode = schematic.findComponentById(firstDiodeid);
    const wire = schematic.findComponentById("wire");
    // const testMxComponent = new KicadComponent(mx.rawLines);
    // const testDiodekComponent = new KicadComponent(diode.rawLines);
    describe("given a mx component and diode ", () => {
      it("return a wire that will connect the two", () => {
        // it should match what is in the template
        const testWire = schematic.getConnectingWire(mx, diode);
        expect(testWire.position.x).toEqual(wire.position.x);
        expect(testWire.position.y).toEqual(wire.position.y);
        expect(testWire.position2.x).toEqual(wire.position2.x);
        expect(testWire.position2.y).toEqual(wire.position2.y);
      });
    });
  });

  describe("getGridDimensions", () => {
    it("returns proper size", () => {
      expect(schematic.getGridDimensions()).toEqual({
        height: 500,
        width: 475
      });
    });
  });

  describe("getSwitch", () => {
    it("returns the correct switch for 0,0", () => {
      expect(schematic.getSwitch({ x: 0, y: 0 }).position).toEqual(
        schematic.switchTemplate.position
      );
    });

    it("returns the correct switch for 1,1", () => {
      expect(schematic.getSwitch({ x: 1, y: 1 }).position).toEqual(
        schematic.switchTemplate2.position
      );
    });
  });

  describe("getEmpty", () => {
    const fixture = "tests/unit/fixtures/kicad.empty.sch";
    const emptySchematic = readFileSync(fixture, "utf8");
    it("returns an empty schematic", () => {
      expect(schematic.getEmpty()).toEqual(emptySchematic);
    });
    it("and keeps its templates", () => {
      expect(schematic.switchTemplate.uid).toEqual(firstMXid);
      expect(schematic.switchTemplate2.uid).toEqual(firstMXid2);
      expect(schematic.diodeTemplate.uid).toEqual(firstDiodeid);
    });
  });
});
