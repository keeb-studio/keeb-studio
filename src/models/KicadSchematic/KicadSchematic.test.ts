import { readFileSync } from "fs";
import KicadSchematic from "./KicadSchematic";

describe("KicadSchematic", () => {
  const fixture = "tests/unit/fixtures/kicad.sch";
  const template = "src/models/templates/kicad.schematic.teplate.sch";
  const raw = readFileSync(fixture, "utf8");
  const schematic = new KicadSchematic(raw);
  const firstMXid = "5D5FEB52";
  const firstMXid2 = "5D5ADAFA";
  const firstDiodeid = "5D5F5496";
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
      expect(schematic.sections[5].type).toEqual("wire");
      expect(schematic.sections[6].type).toEqual("wire");
      expect(schematic.sections[7].type).toEqual("wire");
      expect(schematic.sections[8].type).toEqual("wire");
      expect(schematic.sections[9].type).toEqual("closing");
      expect(schematic.sections.length).toEqual(10);
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

  // describe("render", () => {
  //   describe("when nothing changes", () => {
  //     it("will render without modifications to original", () => {
  //       expect(schematic.render()).toEqual(original);
  //     });
  //   });
  // });

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
        const testWire = schematic.getConnectingWire(
          mx,
          diode,
          schematic.wireTemplate
        );
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
        width: 775
      });
    });
  });

  describe("getSwitch", () => {
    it("returns the correct switch for 0,0", () => {
      expect(schematic.getSwitch({ x: 0, y: 0 }, "1", 1).position).toEqual(
        schematic.switchTemplate.position
      );
    });

    it("returns the correct switch for 1,1", () => {
      expect(schematic.getSwitch({ x: 1, y: 1 }, "1", 1).position).toEqual({
        ...schematic.switchTemplate2.position,
        rotation: 0
      });
    });
  });

  describe("getDiode", () => {
    it("returns the correct diode for 0,0", () => {
      expect(schematic.getDiode({ x: 0, y: 0 }, "1").position).toEqual({
        ...schematic.diodeTemplate.position,
        rotation: 0
      });
    });

    it("returns the correct diode for 1,1", () => {
      const grid = schematic.getGridDimensions();
      const diode = schematic.getDiode({ x: 1, y: 1 }, "1");
      expect(diode.position).toEqual({
        x: schematic.diodeTemplate.position.x + grid.width,
        y: schematic.diodeTemplate.position.y + grid.height,
        rotation: 0
      });
    });

    it("works with wires", () => {
      expect(
        schematic.getConnectingWire(
          schematic.getSwitch({ x: 0, y: 1 }, "1", 1),
          schematic.getDiode({ x: 0, y: 1 }, "1"),
          schematic.wireTemplate
        ).position
      ).toEqual({ x: 1325, y: 1450 });

      expect(
        schematic.getConnectingWire(
          schematic.getSwitch({ x: 1, y: 0 }, "1", 1),
          schematic.getDiode({ x: 1, y: 0 }, "1"),
          schematic.wireTemplate
        ).position2
      ).toEqual({ x: 1725, y: 950 });
      //
    });
  });

  describe("getEmpty", () => {
    const emptyFixture = "tests/unit/fixtures/kicad.empty.sch";
    const emptySchematic = readFileSync(emptyFixture, "utf8");
    it("returns an empty schematic", () => {
      expect(schematic.getEmpty()).toEqual(emptySchematic);
    });
    it("and keeps its templates", () => {
      expect(schematic.switchTemplate.uid).toEqual(firstMXid);
      expect(schematic.switchTemplate2.uid).toEqual(firstMXid2);
      expect(schematic.diodeTemplate.uid).toEqual(firstDiodeid);
    });
  });

  xdescribe("getWithKeeb", () => {
    const schematic = new KicadSchematic(raw);

    it("", () => {
      const keys = [
        {
          height: 1,
          id: "af6bc125-5de9-de27-f496-b71214065a5e",
          rotation_angle: 0,
          rotation_x: 0,
          rotation_y: 0,
          width: 1,
          x: 0,
          y: 0,
          schematic_x: 0,
          schematic_y: 0,
          schematic_index: 0,
          optionFor: null,
          targetAlign: "left",
          index: 0,
          normalX: 0,
          normalY: 0,
          pcbX: 9.525,
          pcbY: 9.525,
          pcbRotation: 0
        },
        {
          height: 1,
          id: "1bf8d0fe-c628-cc27-af70-0124ac987cae",
          rotation_angle: 0,
          rotation_x: 0,
          rotation_y: 0,
          width: 1,
          x: 1,
          y: 0,
          schematic_x: 1,
          schematic_y: 0,
          schematic_index: 1,
          optionFor: null,
          targetAlign: "left",
          index: 1,
          normalX: 1,
          normalY: 0,
          pcbX: 28.575,
          pcbY: 9.525,
          pcbRotation: 0
        },
        {
          height: 1,
          id: "10516859-7e78-0bc7-f0f7-079bad623357",
          rotation_angle: 0,
          rotation_x: 0,
          rotation_y: 0,
          width: 1,
          x: 0,
          y: 1,
          schematic_x: 0,
          schematic_y: 1,
          schematic_index: 0,
          optionFor: null,
          targetAlign: "left",
          index: 2,
          normalX: 0,
          normalY: 1,
          pcbX: 9.525,
          pcbY: 28.575,
          pcbRotation: 0
        },
        {
          height: 1,
          id: "c6f2b19b-4cac-9abb-5a8c-8162417db449",
          rotation_angle: 0,
          rotation_x: 0,
          rotation_y: 0,
          width: 1,
          x: 1,
          y: 1,
          schematic_x: 1,
          schematic_y: 1,
          schematic_index: 1,
          optionFor: null,
          targetAlign: "left",
          index: 3,
          normalX: 1,
          normalY: 1,
          pcbX: 28.575,
          pcbY: 28.575,
          pcbRotation: 0
        },
        {
          height: 1,
          id: "8aff7d7f-bd86-840c-afc8-38f958e4cac5",
          rotation_angle: 0,
          rotation_x: 0,
          rotation_y: 0,
          width: 1,
          x: 0,
          y: 2,
          schematic_x: 0,
          schematic_y: 2,
          schematic_index: 0,
          optionFor: null,
          targetAlign: "left",
          index: 4,
          normalX: 0,
          normalY: 2,
          pcbX: 9.525,
          pcbY: 47.625,
          pcbRotation: 0
        },
        {
          height: 1,
          id: "aed78052-ac7e-a66d-9767-61bc93e5e70c",
          rotation_angle: 0,
          rotation_x: 0,
          rotation_y: 0,
          width: 1,
          x: 1,
          y: 2,
          schematic_x: 1,
          schematic_y: 2,
          schematic_index: 1,
          optionFor: null,
          targetAlign: "left",
          index: 5,
          normalX: 1,
          normalY: 2,
          pcbX: 28.575,
          pcbY: 47.625,
          pcbRotation: 0
        }
      ];
      schematic.getWithKeeb(keys);
      const render = schematic.render();

      expect(render).toContain(`L MX_Alps_Hybrid:MX-NoLED MX0`);
      expect(render).toContain(`L MX_Alps_Hybrid:MX-NoLED MX1`);
      expect(render).toContain(`L MX_Alps_Hybrid:MX-NoLED MX2`);
      expect(render).toContain(`L MX_Alps_Hybrid:MX-NoLED MX3`);
      expect(render).toContain(`L Device:D_Small D0`);
      expect(render).toContain(`L Device:D_Small D1`);
      expect(render).toContain(`L Device:D_Small D2`);
      expect(render).toContain(`L Device:D_Small D3`);

      //mx 0 first position
      expect(render).toContain(`P 1375 1100`);
      //diode 0 first position
      expect(render).toContain(`P 950 1050`);

      //wires 0
      expect(render).toContain(`950  1275  1825  1275`);
      expect(render).toContain(`1825  1275  1825  1150`);
      expect(render).toContain(`1125  1150  1125  1700`);
      expect(render).toContain(`1325  950  950  950`);
      expect(render).toContain(`950  1150  950  1275`);
    });
    //
  });
});
