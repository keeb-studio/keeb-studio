import KicadPCB from "./KicadPCB";

describe("KicadPCB", () => {
  it("simple", () => {
    const rawFile = `(kicad_pcb())`;
    const pcb = new KicadPCB(rawFile);
    expect(pcb.parse()).toEqual({
      kicad_pcb: {}
    });
  });

  it("1 nested", () => {
    const rawFile = `(kicad_pcb  (version 20171130) )`;
    const pcb = new KicadPCB(rawFile);
    expect(pcb.parse()).toEqual({
      kicad_pcb: {
        version: "20171130"
      }
    });
  });

  it("2 nested", () => {
    const rawFile = `(kicad_pcb  (version 20171130) (a 1) )`;
    const pcb = new KicadPCB(rawFile);
    expect(pcb.parse()).toEqual({
      kicad_pcb: {
        version: "20171130",
        a: "1"
      }
    });
  });

  it("2 nested array", () => {
    const rawFile = `(kicad_pcb  (version 20171130) (a d 1) )`;
    const pcb = new KicadPCB(rawFile);
    expect(pcb.parse()).toEqual({
      kicad_pcb: {
        version: "20171130",
        a: ["d", "1"]
      }
    });
  });

  it("can handle 3 levels deep", () => {
    const rawFile = `(kicad_pcb (version 20171130) (host pcbnew "(5.1.0)-1")
    (general
      (thickness 1.6)
      (drawings 0)
      (tracks 0)
      (zones 0)
      (modules 2)
      (nets 5)
    )`;

    const pcb = new KicadPCB(rawFile);
    expect(pcb.parse()).toEqual({
      kicad_pcb: {
        general: {
          drawings: "0",
          modules: "2",
          nets: "5",
          thickness: "1.6",
          tracks: "0",
          zones: "0"
        },
        host: ["pcbnew", '"(5.1.0)-1"'],
        version: "20171130"
      }
    });
  });

  it("3 value array", () => {
    // const rawFile = `(kicad_pcb  fp_text value MX-NoLED (at 0 5.08) (layer F.SilkS) hide)`;
    const rawFile = `(kicad_pcb  (fp_text value MX-NoLED at))`;
    const pcb = new KicadPCB(rawFile);
    expect(pcb.parse()).toEqual({
      kicad_pcb: {
        fp_text: ["value", "MX-NoLED", "at"]
      }
    });
  });

  it.only("array with mixed objects", () => {
    // const rawFile = `(kicad_pcb  fp_text value MX-NoLED (at 0 5.08) (layer F.SilkS) hide)`;
    const rawFile = `(kicad_pcb  (fp_text value (MX-NoLED at)))`;
    const pcb = new KicadPCB(rawFile);
    expect(pcb.parse()).toEqual({
      kicad_pcb: {
        fp_text: ["value", { "MX-NoLED": "at" }]
      }
    });
  });
  it("it can parse a pcb a mix array type value", () => {
    const path = "src/models/templates/kicad.pcb.tamplate.kicad_pcb";
    // const rawFile = readFileSync(path, "utf8");
    // const pcb = new KicadPCB(rawFile);
  });
});
