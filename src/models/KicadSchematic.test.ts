import { readFileSync } from "fs";
import { KicadComponent } from "./KicadComponent";
import { KicadPeice } from "./KicadPeice";
import KicadSchematic from "./KicadSchematic";

describe("KicadSchematic", () => {
  const fixture = "tests/unit/fixtures/kicad.sch";
  const schematic = new KicadSchematic(fixture);
  const firstMXid = "5D5FEB52";
  const firstDiodeid = "5D5F5496";
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

    it("finds the first diode component as diodeTemplate", () => {
      expect(schematic.diodeTemplate.uid).toEqual(firstDiodeid);
    });

    it.skip("finds the wires", () => {
      expect(schematic.wires.length).toEqual(1);
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
    // const testMxComponent = new KicadComponent(mx.rawLines);
    // const testDiodekComponent = new KicadComponent(diode.rawLines);
    describe("given a mx component and diode ", () => {
      it("return a wire that will connect the two", () => {
        const wire = schematic.getConnectingWire(mx, diode);
      });
    });
  });
  describe("KicadComponent", () => {
    const component = new KicadComponent(
      schematic.findComponentById(firstMXid).rawLines
    );
    it("parses the uid", () => {
      expect(component.uid).toEqual(firstMXid);
    });

    it("parses the position", () => {
      expect(component.position).toEqual({ x: 1275, y: 1050 });
    });

    it("can have it's position changed", () => {
      const testComponent = new KicadComponent(component.rawLines);
      testComponent.position.x = 0;
      expect(testComponent.position).toEqual({ x: 0, y: 1050 });
    });

    describe("lines", () => {
      it("find and tokenizes position", () => {
        //

        expect(component.lines[4]).toEqual({
          hasPosition: true,
          hasDigits: true,
          original: `F 0 "MX1" H 1308 1273 60  0000 C CNN`,
          x: 1308,
          y: 1273,
          xOffset: 33,
          yOffset: 223,
          template: 'F 0 "MX1" H templateX templateY 60  0000 C CNN',
          originPosition: {
            x: 1275,
            y: 1050
          }
        });

        expect(component.lines[3]).toEqual({
          hasPosition: true,
          hasDigits: true,
          original: "P 1275 1050",
          x: 1275,
          y: 1050,
          xOffset: 0,
          yOffset: 0,
          template: "P templateX templateY",
          originPosition: {
            x: 1275,
            y: 1050
          }
        });
      });

      it("will not update when changing x and y", () => {
        //when changing x and y
        const originPosition = component.lines[3].originPosition;
        const original = component.lines[3].original;
        const testPeice = new KicadPeice(original, originPosition);
        testPeice.x = 123;
        testPeice.y = 456;
        // can update the line
        expect(testPeice.updatedLine()).toEqual("P 1275 1050");
      });

      it("will update if changing originPosition", () => {
        //when changing x and y
        const originPosition = component.lines[3].originPosition;
        const original = component.lines[3].original;
        const testPeice = new KicadPeice(original, originPosition);
        // can update the line
        testPeice.originPosition.x = 1200;
        testPeice.originPosition.y = 1000;
        expect(testPeice.updatedLine()).toEqual("P 1200 1000");
      });
    });
  });
});
