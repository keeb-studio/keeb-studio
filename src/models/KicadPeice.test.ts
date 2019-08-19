import { KicadPeice } from "./KicadPeice";
describe("KicadPeice", () => {
  it("updates position properly", () => {
    const testPeice = new KicadPeice("P 1276 1051", { x: 1276, y: 1051 });
    expect(testPeice.updatedLine()).toEqual("P 1276 1051");
    testPeice.x = 1280;
    testPeice.y = 1250;
    expect(testPeice.updatedLine()).toEqual("P 1280 1250");

    testPeice.x = 1276;
    testPeice.y = 1051;
    expect(testPeice.updatedLine()).toEqual("P 1276 1051");
  });
});
