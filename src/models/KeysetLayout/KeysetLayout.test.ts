import "core-js/fn/array/flat-map";
import { readFileSync } from "fs";
import KeysetLayout from "./KeysetLayout";
describe("KeysetLayout", () => {
  it.only("can initialize from raw", () => {
    const path = "/Users/barendt/Desktop/jack.json";
    const raw = readFileSync(path, "utf8");
    const keysetLayout = new KeysetLayout({ raw });
    const keys = keysetLayout.keys();

    expect(keys[0].label).toEqual("Esc");
    expect(keys[0].index).toEqual(0);
    expect(keys[0].gridIndex).toEqual({ col: 0, row: 0 });
    expect(keys[0].x).toEqual(0);
    expect(keys[0].y).toEqual(0);

    expect(keys[16].label).toEqual("Tab");
    expect(keys[16].index).toEqual(16);
    expect(keys[16].gridIndex).toEqual({ col: 0, row: 1 });
    expect(keys[16].x).toEqual(0);
    expect(keys[16].y).toEqual(1);

    expect(keys[17].label).toEqual("Q");
    expect(keys[17].x).toEqual(1.5);
    expect(keys[17].y).toEqual(1);

    expect(keys[17].label).toEqual("Q");
    expect(keys[17].x).toEqual(1.5);
    expect(keys[17].y).toEqual(1);

    expect(keys[56].label).toEqual("Shift");
    expect(keys[56].x).toEqual(12.25);
    expect(keys[56].y).toEqual(3);

    expect(keys[57].label).toEqual("Up");
    expect(keys[57].x).toEqual(14);
    expect(keys[57].y).toEqual(3);
  });
});
