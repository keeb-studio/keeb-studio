import KicadPCB, { CLOSE_CONTEXT, START } from "./KicadPCB";
describe("KicadPCB", () => {
  describe("addToken", () => {
    describe("()", () => {
      it("(", () => {
        expect(
          KicadPCB.addToken({
            tokens: ["(", ")"],
            action: START,
            context: {},
            property: "",
            open: 0
          })
        ).toEqual({
          action: CLOSE_CONTEXT,
          context: {},
          property: "",
          tokens: [],
          open: 0
        });
      });
    });
    describe("(kicad_pcb())", () => {
      it("kicad_pcb", () => {
        expect(
          KicadPCB.addToken({
            tokens: ["(", "kicad_pcb", "(", ")", ")"],
            action: START,
            context: {},
            property: "",
            open: 0
          })
        ).toEqual({
          action: CLOSE_CONTEXT,
          context: { kicad_pcb: {} },
          property: "kicad_pcb",
          tokens: [],
          open: 0
        });
      });
    });

    describe("(kicad_pcb((version 20171130)))", () => {
      it("kicad_pcb", () => {
        expect(
          KicadPCB.addToken({
            tokens: [
              /**/ "(",
              /*  */ "kicad_pcb",
              /*  */ "(",
              /*    */ "(",
              /*      */ "version",
              /*      */ "20171130",
              /*    */ ")",
              /*  */ ")",
              /**/ ")"
            ],
            action: START,
            context: {},
            property: "",
            open: 0
          })
        ).toEqual({
          action: CLOSE_CONTEXT,
          context: { kicad_pcb: { version: "20171130" } },
          property: "kicad_pcb",
          tokens: [],
          open: 0
        });
      });
    });

    describe("(kicad_pcb((version 20171130) (a 1)))", () => {
      it("kicad_pcb", () => {
        expect(
          KicadPCB.addToken({
            tokens: [
              /**/ "(",
              /*  */ "kicad_pcb",
              /*  */ "(",
              /*    */ "(",
              /*      */ "version",
              /*      */ "20171130",
              /*    */ ")",
              /*    */ "(",
              /*      */ "a",
              /*      */ "1",
              /*    */ ")",
              /*  */ ")",
              /**/ ")"
            ],
            action: START,
            context: {},
            property: "",
            open: 0
          })
        ).toEqual({
          action: CLOSE_CONTEXT,
          context: { kicad_pcb: { version: "20171130", a: "1" } },
          property: "kicad_pcb",
          tokens: [],
          open: 0
        });
      });
    });

    describe("(kicad_pcb((version 20171130) (a 1 2)))", () => {
      it("kicad_pcb", () => {
        expect(
          KicadPCB.addToken({
            tokens: [
              /**/ "(",
              /*  */ "kicad_pcb",
              /*  */ "(",
              /*    */ "(",
              /*      */ "version",
              /*      */ "20171130",
              /*    */ ")",
              /*    */ "(",
              /*      */ "a",
              /*      */ "1",
              /*      */ "2",
              /*    */ ")",
              /*  */ ")",
              /**/ ")"
            ],
            action: START,
            context: {},
            property: "",
            open: 0
          })
        ).toEqual({
          action: CLOSE_CONTEXT,
          context: { kicad_pcb: { version: "20171130", a: ["1", "2"] } },
          property: "kicad_pcb",
          tokens: [],
          open: 0
        });
      });
    });

    describe("(kicad_pcb((version 20171130) (a 1 2 (b 1))))", () => {
      it.only("kicad_pcb", () => {
        expect(
          KicadPCB.addToken({
            tokens: [
              /**/ "(",
              /*  */ "kicad_pcb",
              /*  */ "(",
              /*    */ "(",
              /*      */ "version",
              /*      */ "20171130",
              /*    */ ")",
              /*    */ "(",
              /*      */ "a",
              /*      */ "1",
              /*      */ "(",
              /*      */ "b",
              /*      */ "1",
              /*      */ ")",
              /*    */ ")",
              /*  */ ")",
              /**/ ")"
            ],
            action: START,
            context: {},
            property: "",
            open: 0
          })
        ).toEqual({
          action: CLOSE_CONTEXT,
          context: {
            kicad_pcb: { version: "20171130", a: ["1", { b: 1 }] }
          },
          property: "kicad_pcb",
          tokens: [],
          open: 0
        });
      });
    });
  });

  // it("can handle 3 levels deep", () => {
  //   const rawFile = `(kicad_pcb (version 20171130) (host pcbnew "(5.1.0)-1")
  //   (general
  //     (thickness 1.6)
  //     (drawings 0)
  //     (tracks 0)
  //     (zones 0)
  //     (modules 2)
  //     (nets 5)
  //   )`;
  //   const pcb = new KicadPCB(rawFile);
  //   expect(pcb.parse()).toEqual({
  //     kicad_pcb: {
  //       general: {
  //         drawings: "0",
  //         modules: "2",
  //         nets: "5",
  //         thickness: "1.6",
  //         tracks: "0",
  //         zones: "0"
  //       },
  //       host: ["pcbnew", '"(5.1.0)-1"'],
  //       version: "20171130"
  //     }
  //   });
  // });
  // it("3 value array", () => {
  //   // const rawFile = `(kicad_pcb  fp_text value MX-NoLED (at 0 5.08) (layer F.SilkS) hide)`;
  //   const rawFile = `(kicad_pcb  (fp_text value MX-NoLED at))`;
  //   const pcb = new KicadPCB(rawFile);
  //   expect(pcb.parse()).toEqual({
  //     kicad_pcb: {
  //       fp_text: ["value", "MX-NoLED", "at"]
  //     }
  //   });
  // });
  // it("array with mixed objects", () => {
  //   // const rawFile = `(kicad_pcb  fp_text value MX-NoLED (at 0 5.08) (layer F.SilkS) hide)`;
  //   const rawFile = `(kicad_pcb  (fp_text value (MX-NoLED at)))`;
  //   const pcb = new KicadPCB(rawFile);
  //   expect(pcb.parse()).toEqual({
  //     kicad_pcb: {
  //       fp_text: ["value", { "MX-NoLED": "at" }]
  //     }
  //   });
  // });
  // it("it can parse a pcb a mix array type value", () => {
  //   const path = "src/models/templates/kicad.pcb.tamplate.kicad_pcb";
  //   // const rawFile = readFileSync(path, "utf8");
  //   // const pcb = new KicadPCB(rawFile);
  // });
});
