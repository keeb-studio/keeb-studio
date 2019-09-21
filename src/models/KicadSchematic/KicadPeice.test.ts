import { KicadPeice } from "./KicadPeice";
describe("KicadPeice", () => {
  it("updates position properly", () => {
    const testPeice = new KicadPeice(
      "P 1276 1051",
      { x: 1276, y: 1051, rotation: 0 },
      "1",
      "uid1",
      "uid1"
    );
    expect(testPeice.updatedLine()).toEqual("P 1276 1051");
    testPeice.x = 1280;
    testPeice.y = 1250;
    expect(testPeice.updatedLine()).toEqual("P 1280 1250");

    testPeice.x = 1276;
    testPeice.y = 1051;
    expect(testPeice.updatedLine()).toEqual("P 1276 1051");
  });

  it("updates label properly", () => {
    const testPeice = new KicadPeice(
      "L MX_Alps_Hybrid:MX-NoLED MX0",
      { x: 1276, y: 1051, rotation: 0 },
      "2",
      "uid2",
      "uid2"
    );
    expect(testPeice.updatedLine()).toEqual("L MX_Alps_Hybrid:MX-NoLED MX2");
  });
});
