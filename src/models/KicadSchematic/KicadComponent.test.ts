import { readFileSync } from "fs";
import { KicadComponent } from "./KicadComponent";
import { KicadPeice } from "./KicadPeice";
import KicadSchematic from "./KicadSchematic";
const firstMXid = "5D5FEB52";
describe("KicadComponent", () => {
  const path = "tests/unit/fixtures/kicad2.sch";
  const raw = readFileSync(path, "utf8");
  const schematic = new KicadSchematic(raw);
  const component = new KicadComponent(
    schematic.findComponentById(firstMXid).rawLines
  );
  it("parses the uid", () => {
    expect(component.uid).toEqual(firstMXid);
  });

  it("parses the position", () => {
    expect(component.position).toEqual({ x: 1375, y: 1100, rotation: 270 });
  });

  it("can have it's position changed", () => {
    const testComponent = new KicadComponent(component.rawLines);
    testComponent.position.x = 0;
    expect(testComponent.position).toEqual({ x: 0, y: 1100, rotation: 270 });
  });

  describe("lines", () => {
    it("find and tokenizes position", () => {
      //

      component.lines.map((x: any) => (x.newUid = "somestaticuid"));
      expect(component.lines[1]).toEqual({
        gridSize: {
          height: 1,
          width: 1
        },
        hasDigits: false,
        hasLabel: true,
        hasPosition: false,
        keyWidth: 1,
        label: "1",
        labelHolder: "TEMPLATE_LABEL",
        newUid: "somestaticuid",
        original: "L MX_Alps_Hybrid:MX-NoLED MX0",
        rotation: 0,
        template: "L MX_Alps_Hybrid:MX-NoLED MXTEMPLATE_LABEL",
        templateOriginPosition: {
          rotation: 270,
          x: 1375,
          y: 1100
        },
        uid: "5D5FEB52",
        x: 0,
        xOffset: 0,
        y: 0,
        yOffset: 0
      });

      expect(component.lines[4]).toEqual({
        gridSize: {
          height: 1,
          width: 1
        },
        hasLabel: true,
        hasPosition: true,
        keyWidth: 1,
        label: "1",
        labelHolder: "TEMPLATE_LABEL",
        newUid: "somestaticuid",
        hasDigits: true,
        original: `F 0 "MX0" H 1408 1323 60  0000 C CNN`,
        rotation: 0,
        uid: "5D5FEB52",
        x: 1408,
        y: 1323,
        xOffset: 33,
        yOffset: 223,
        template: 'F 0 "MXTEMPLATE_LABEL" H templateX templateY 60  0000 C CNN',
        templateOriginPosition: {
          rotation: 270,
          x: 1375,
          y: 1100
        }
      });

      expect(component.lines[3]).toEqual({
        gridSize: {
          height: 1,
          width: 1
        },
        hasLabel: false,
        labelHolder: "TEMPLATE_LABEL",
        newUid: "somestaticuid",
        hasPosition: true,
        keyWidth: 1,
        label: "1",
        hasDigits: true,
        original: "P 1375 1100 270",
        rotation: 270,
        uid: "5D5FEB52",
        x: 1375,
        y: 1100,
        xOffset: 0,
        yOffset: 0,
        template: "P templateX templateY templateRotation",
        templateOriginPosition: {
          rotation: 270,
          x: 1375,
          y: 1100
        }
      });
    });

    it("will update when changing x and y", () => {
      // when changing x and y
      const templateOriginPosition = component.lines[3].templateOriginPosition;
      const original = component.lines[3].original;
      const testPeice = new KicadPeice(
        original,
        templateOriginPosition,
        "1",
        "uid1",
        "uid1000",
        { width: 1, height: 1 },
        1,
        false
      );
      testPeice.x = 123;
      testPeice.y = 456;
      // can update the line
      expect(testPeice.updatedLine()).toEqual("P 123 456 270");
    });
  });
});
