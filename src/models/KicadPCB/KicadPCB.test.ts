import KicadPCB from "./KicadPCB";
import { General } from "./Sections/General";
describe("KicadPCB", () => {
  describe("render", () => {
    //

    const raw = `(kicad_pcb (version 20171130) (host pcbnew "(5.1.0)-1")
  (general
    (thickness 1.6)
    (drawings 0)
    (tracks 0)
    (zones 0)
    (modules 2)
    (nets 5)
  )
  
  (module Keebio-Parts:MX_PCB_100H (layer F.Cu) (tedit 549A0505) (tstamp 5D61E4E6)
    (at 10 15)
    (path /5D5FEB52)
    (fp_text reference MX1 (at 0 3.175) (layer F.SilkS)
      (effects (font (size 1.27 1.524) (thickness 0.2032)))
    )
    (fp_text value MX-NoLED (at 0 5.08) (layer F.SilkS) hide
      (effects (font (size 1.27 1.524) (thickness 0.2032)))
    )
    (fp_line (start -6.35 -6.35) (end 6.35 -6.35) (layer Cmts.User) (width 0.1524))
    (fp_text user 1.00u (at -5.715 8.255) (layer Dwgs.User)
      (effects (font (size 1.524 1.524) (thickness 0.3048)))
    )
    (pad 1 thru_hole circle (at 2.54 -5.08) (size 2.286 2.286) (drill 1.4986) (layers *.Cu *.SilkS *.Mask)
      (net 4 "Net-(MX1-Pad1)"))
  )
  
  (module Keebio-Parts:Diode-dual (layer F.Cu) (tedit 5B7FFAB1) (tstamp 5D61E4C8)
    (at 0 0 270)
    (path /5D5F5496)
    (attr smd)
    (fp_text reference D1 (at -0.0254 1.4) (layer F.SilkS)
      (effects (font (size 0.8 0.8) (thickness 0.15)))
    )
    (fp_text value D_Small (at 0 -1.925 270) (layer F.SilkS) hide
      (effects (font (size 0.8 0.8) (thickness 0.15)))
    )
    (fp_line (start -2.54 0.762) (end 2.54 0.762) (layer F.SilkS) (width 0.15))
    (fp_line (start 2.54 0.762) (end 2.54 -0.762) (layer F.SilkS) (width 0.15))
    (fp_line (start 2.54 -0.762) (end -2.54 -0.762) (layer F.SilkS) (width 0.15))
    (fp_line (start -2.54 -0.762) (end -2.54 0.762) (layer F.SilkS) (width 0.15))
    (fp_line (start -2.54 0.762) (end -2.032 0.762) (layer F.SilkS) (width 0.15))
    (fp_line (start 2.159 0.762) (end 2.159 -0.762) (layer F.SilkS) (width 0.15))
    (fp_line (start 2.286 -0.762) (end 2.286 0.762) (layer F.SilkS) (width 0.15))
    (fp_line (start 2.413 0.762) (end 2.413 -0.762) (layer F.SilkS) (width 0.15))
    (fp_line (start 2.032 -0.762) (end 2.032 0.762) (layer F.SilkS) (width 0.15))
    (fp_line (start 1.905 0.762) (end 1.905 -0.762) (layer F.SilkS) (width 0.15))
    (fp_line (start 1.778 0.762) (end 1.778 -0.762) (layer F.SilkS) (width 0.15))
    (pad 1 smd rect (at 2.5 0 270) (size 2.9 0.5) (layers F.Cu)
      (net 1 "Net-(D1-Pad1)"))
    (pad 2 smd rect (at -2.5 0 270) (size 2.9 0.5) (layers F.Cu)
      (net 2 "Net-(D1-Pad2)"))
    (pad 1 thru_hole rect (at 3.9 0 270) (size 1.6 1.6) (drill 1) (layers *.Cu *.Mask F.SilkS)
      (net 1 "Net-(D1-Pad1)"))
    (pad 2 thru_hole circle (at -3.9 0 270) (size 1.6 1.6) (drill 1) (layers *.Cu *.Mask F.SilkS)
      (net 2 "Net-(D1-Pad2)"))
    (pad 2 smd rect (at -1.4 0 270) (size 1.6 1.2) (layers F.Cu F.Paste F.Mask)
      (net 2 "Net-(D1-Pad2)"))
    (pad 1 smd rect (at 1.4 0 270) (size 1.6 1.2) (layers F.Cu F.Paste F.Mask)
      (net 1 "Net-(D1-Pad1)"))
    (pad 1 smd rect (at 2.5 0 270) (size 2.9 0.5) (layers B.Cu)
      (net 1 "Net-(D1-Pad1)"))
    (pad 1 smd rect (at 1.4 0 270) (size 1.6 1.2) (layers B.Cu B.Paste B.Mask)
      (net 1 "Net-(D1-Pad1)"))
    (pad 2 smd rect (at -1.4 0 270) (size 1.6 1.2) (layers B.Cu B.Paste B.Mask)
      (net 2 "Net-(D1-Pad2)"))
    (pad 2 smd rect (at -2.5 0 270) (size 2.9 0.5) (layers B.Cu)
      (net 2 "Net-(D1-Pad2)"))
  )
)
`;

    const pcb = new KicadPCB({ raw: raw, path: "" });
    it("renders properly", () => {
      expect(pcb.render()).toEqual(raw);
    });

    it("has the proper sections", () => {
      //
      const firstSection = pcb.sections[0];
      expect(firstSection instanceof General).toBe(true);
    });

    describe("findByName", () => {
      it("can find the module", () => {
        expect(pcb.findByName("MX1").render()).toContain(
          "fp_text reference MX1 "
        );
      });

      it("throws not found exception", () => {
        expect(() => {
          pcb.findByName("MX2");
        }).toThrowError("MX2 Not Found");
      });
    });

    it("it determines diff between mx and diode", () => {
      expect(pcb.xDiodeDiff).toEqual(-10);
      expect(pcb.yDiodeDiff).toEqual(-15);
    });

    describe("positionSwitch", () => {
      it("places the mx module properly when rendered", () => {
        pcb.positionSwitch(1, 1, 1);
        const result = pcb.render().split("\n");
        expect(result[11]).toEqual("    (at 19.05 19.05)");
      });

      it.only("places the diode module properly when rendered", () => {
        pcb.positionSwitch(1, 1, 1);
        const result = pcb.render().split("\n");
        expect(result[28]).toEqual("    (at 9.05 4.05)");
      });
    });
  });
});
