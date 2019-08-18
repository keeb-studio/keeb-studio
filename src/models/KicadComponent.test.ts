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
