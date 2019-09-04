import KicadPCB from "./KicadPCB";
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
    (at 43.144201 39.0872)
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

)
`;

    it("renders properly", () => {
      const pcb = new KicadPCB({ raw: raw, path: "" });
      expect(pcb.render()).toEqual(raw);
    });
  });
});
