import { Module } from "./Module";

describe("Module", () => {
  describe("init", () => {
    const lines = [
      `(module Keebio-Parts:MX_PCB_100H (layer F.Cu) (tedit 549A0505) (tstamp 5D61E4E6)`,
      `    (at 43.144201 39.0872 180)`,
      `    (path /5D5FEB52)`,
      `    (fp_text reference MX0 (at 0 3.175) (layer F.SilkS)`,
      `      (effects (font (size 1.27 1.524) (thickness 0.2032)))`,
      `    )`,
      `    (fp_text value MX-NoLED (at 0 5.08) (layer F.SilkS) hide`,
      `      (effects (font (size 1.27 1.524) (thickness 0.2032)))`,
      `    )`,
      `    (fp_line (start -6.985 6.985) (end -6.985 -6.985) (layer Eco2.User) (width 0.1524))`,
      `    (fp_line (start 6.985 6.985) (end -6.985 6.985) (layer Eco2.User) (width 0.1524))`,
      `    (fp_line (start 6.985 -6.985) (end 6.985 6.985) (layer Eco2.User) (width 0.1524))`,
      `    (fp_line (start -6.985 -6.985) (end 6.985 -6.985) (layer Eco2.User) (width 0.1524))`,
      `    (fp_line (start -6.35 -4.572) (end -6.35 -6.35) (layer F.SilkS) (width 0.381))`,
      `    (fp_line (start -6.35 6.35) (end -6.35 4.572) (layer F.SilkS) (width 0.381))`,
      `    (fp_line (start -4.572 6.35) (end -6.35 6.35) (layer F.SilkS) (width 0.381))`,
      `    (fp_line (start 6.35 6.35) (end 4.572 6.35) (layer F.SilkS) (width 0.381))`,
      `    (fp_line (start 6.35 4.572) (end 6.35 6.35) (layer F.SilkS) (width 0.381))`,
      `    (fp_line (start 6.35 -6.35) (end 6.35 -4.572) (layer F.SilkS) (width 0.381))`,
      `    (fp_line (start 4.572 -6.35) (end 6.35 -6.35) (layer F.SilkS) (width 0.381))`,
      `    (fp_line (start -6.35 -6.35) (end -4.572 -6.35) (layer F.SilkS) (width 0.381))`,
      `    (fp_line (start -9.398 9.398) (end -9.398 -9.398) (layer Dwgs.User) (width 0.1524))`,
      `    (fp_line (start 9.398 9.398) (end -9.398 9.398) (layer Dwgs.User) (width 0.1524))`,
      `    (fp_line (start 9.398 -9.398) (end 9.398 9.398) (layer Dwgs.User) (width 0.1524))`,
      `    (fp_line (start -9.398 -9.398) (end 9.398 -9.398) (layer Dwgs.User) (width 0.1524))`,
      `    (fp_line (start -6.35 6.35) (end -6.35 -6.35) (layer Cmts.User) (width 0.1524))`,
      `    (fp_line (start 6.35 6.35) (end -6.35 6.35) (layer Cmts.User) (width 0.1524))`,
      `    (fp_line (start 6.35 -6.35) (end 6.35 6.35) (layer Cmts.User) (width 0.1524))`,
      `    (fp_line (start -6.35 -6.35) (end 6.35 -6.35) (layer Cmts.User) (width 0.1524))`,
      `    (fp_text user 1.00u (at -5.715 8.255) (layer Dwgs.User)`,
      `      (effects (font (size 1.524 1.524) (thickness 0.3048)))`,
      `    )`,
      `    (pad HOLE np_thru_hole circle (at 5.08 0) (size 1.8 1.8) (drill 1.8) (layers *.Cu))`,
      `    (pad HOLE np_thru_hole circle (at -5.08 0) (size 1.8 1.8) (drill 1.8) (layers *.Cu))`,
      `    (pad HOLE np_thru_hole circle (at 0 0) (size 3.9878 3.9878) (drill 3.9878) (layers *.Cu))`,
      `    (pad 2 thru_hole circle (at -3.81 -2.54) (size 2.286 2.286) (drill 1.4986) (layers *.Cu *.SilkS *.Mask)`,
      `      (net 3 "Net-(MX0-Pad2)"))`,
      `    (pad 1 thru_hole circle (at 2.54 -5.08) (size 2.286 2.286) (drill 1.4986) (layers *.Cu *.SilkS *.Mask)`,
      `      (net 4 "Net-(MX0-Pad1)"))`,
      `  )`
    ];

    const module = new Module(lines);

    it("parses position", () => {
      expect(module.x).toEqual(43.144201);
      expect(module.y).toEqual(39.0872);
    });

    it("parses type", () => {
      expect(module.type).toEqual("MX-NoLED");
    });

    it("parses name", () => {
      expect(module.name).toEqual("MX0");
    });

    it("renders with updated position", () => {
      module.x = 1.2345;
      module.y = 6.789;
      module.rotation = 90;
      expect(module.render()).toContain("(at 1.23 6.79 90)");
    });
  });
});
