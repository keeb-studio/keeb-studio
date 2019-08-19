import { KicadComponent } from "./KicadComponent";
import { KicadPeice } from "./KicadPeice";
import KicadSchematic from "./KicadSchematic";

const firstMXid = "5D5FEB52";
describe("KicadComponent", () => {
  const fixture = "tests/unit/fixtures/kicad.sch";
  const schematic = new KicadSchematic(fixture);
  const component = new KicadComponent(
    schematic.findComponentById(firstMXid).rawLines
  );
  it("parses the uid", () => {
    expect(component.uid).toEqual(firstMXid);
  });

  it("parses the position", () => {
    expect(component.position).toEqual({ x: 1375, y: 1100 });
  });

  it("can have it's position changed", () => {
    const testComponent = new KicadComponent(component.rawLines);
    testComponent.position.x = 0;
    expect(testComponent.position).toEqual({ x: 0, y: 1100 });
  });

  describe("lines", () => {
    it("find and tokenizes position", () => {
      //

      expect(component.lines[4]).toEqual({
        hasPosition: true,
        hasDigits: true,
        original: `F 0 "MX1" H 1408 1323 60  0000 C CNN`,
        x: 1408,
        y: 1323,
        xOffset: 33,
        yOffset: 223,
        template: 'F 0 "MX1" H templateX templateY 60  0000 C CNN',
        templateOriginPosition: {
          x: 1375,
          y: 1100
        }
      });

      expect(component.lines[3]).toEqual({
        hasPosition: true,
        hasDigits: true,
        original: "P 1375 1100",
        x: 1375,
        y: 1100,
        xOffset: 0,
        yOffset: 0,
        template: "P templateX templateY",
        templateOriginPosition: {
          x: 1375,
          y: 1100
        }
      });
    });

    it("will update when changing x and y", () => {
      //when changing x and y
      const templateOriginPosition = component.lines[3].templateOriginPosition;
      const original = component.lines[3].original;
      const testPeice = new KicadPeice(original, templateOriginPosition);
      testPeice.x = 123;
      testPeice.y = 456;
      // can update the line
      expect(testPeice.updatedLine()).toEqual("P 123 456");
    });
  });
});
