import { readFileSync, unlinkSync } from "fs";
import KicadSchematic from "./KicadSchematic";

describe("KicadSchematic", () => {
  const fixture = "tests/unit/fixtures/kicad.sch";
  const template = "src/models/templates/kicad.schematic.teplate.sch";
  const schematic = new KicadSchematic(fixture);
  const firstMXid = "5D5FEB52";
  const firstMXid2 = "5D5ADAFA";
  const firstDiodeid = "5D5F5496";
  const original = readFileSync(fixture, "utf8");
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
      expect(schematic.getSwitch({ x: 0, y: 0 }, "1").position).toEqual(
        schematic.switchTemplate.position
      );
    });

    it("returns the correct switch for 1,1", () => {
      expect(schematic.getSwitch({ x: 1, y: 1 }, "1").position).toEqual(
        schematic.switchTemplate2.position
      );
    });
  });

  describe("getDiode", () => {
    it("returns the correct diode for 0,0", () => {
      expect(schematic.getDiode({ x: 0, y: 0 }, "1").position).toEqual(
        schematic.diodeTemplate.position
      );
    });

    it("returns the correct diode for 1,1", () => {
      const grid = schematic.getGridDimensions();
      const diode = schematic.getDiode({ x: 1, y: 1 }, "1");
      expect(diode.position).toEqual({
        x: schematic.diodeTemplate.position.x + grid.width,
        y: schematic.diodeTemplate.position.y + grid.height
      });
    });

    it("works with wires", () => {
      expect(
        schematic.getConnectingWire(
          schematic.getSwitch({ x: 0, y: 1 }, "1"),
          schematic.getDiode({ x: 0, y: 1 }, "1"),
          schematic.wireTemplate
        ).position
      ).toEqual({ x: 1325, y: 1450 });

      expect(
        schematic.getConnectingWire(
          schematic.getSwitch({ x: 1, y: 0 }, "1"),
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

  describe("writeFile", () => {
    it("doesn't raise exception", () => {
      const kl2 = [
        {
          name: "jack"
        },
        [
          "Esc",
          "!\n1",
          `"\n2`,
          "£\n3",
          "$\n4",
          "%\n5",
          "^\n6",
          "&\n7",
          "*\n8",
          "(\n9",
          ")\n0",
          "_\n-",
          "+\n=",
          "|\n\\",
          "~",
          "Delete"
        ],
        [
          {
            w: 1.5
          },
          "Tab",
          "Q",
          "W",
          "E",
          "R",
          "T",
          "Y",
          "U",
          "I",
          "O",
          "P",
          "{\n[",
          "}\n]",
          {
            a: 6,
            w: 1.5
          },
          "Backspace",
          {
            a: 4
          },
          "Pg Up"
        ],
        [
          {
            w: 1.75
          },
          "Caps Lock",
          "A",
          "S",
          "D",
          "F",
          "G",
          "H",
          "J",
          "K",
          "L",
          ":\n;",
          "@\n'",
          {
            a: 6,
            w: 2.25
          },
          "Enter",
          {
            a: 4
          },
          "Pg Dn"
        ],
        [
          {
            w: 2.25
          },
          "Shift",
          "Z",
          "X",
          "C",
          "V",
          "B",
          "N",
          "M",
          "<\n,",
          ">\n.",
          "?\n/",
          {
            w: 1.75
          },
          "Shift",
          "Up",
          "Fn"
        ],
        [
          {
            w: 1.5
          },
          "Ctrl",
          {
            x: 0.75,
            w: 1.5
          },
          "Super",
          {
            a: 7,
            w: 7
          },
          "",
          {
            a: 4,
            w: 1.5
          },
          "Alt",
          {
            x: 0.75
          },
          "Left",
          "Down",
          "Right"
        ]
      ];

      const templateSchematic = new KicadSchematic(template);
      templateSchematic.writeFile(kl2, "temp2.sch");
      unlinkSync("temp2.sch");
    });
  });
  describe.only("foo", () => {
    //
  });
});
