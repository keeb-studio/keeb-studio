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
  });

  // describe("simplest", ()cc => {
  //   const rawFile = `()`;
  //   it("functionalParse", () => {
  //     expect(KicadPCB.funtionalParse(rawFile)).toEqual({});
  //   });
  //   it.only("functionalParseToken", () => {
  //     const parseParams = getDefaultParseContext();
  //     expect(
  //       KicadPCB.functionParseToken({
  //         token: "(",
  //         remainingTokens: [")"],
  //         context: {},
  //         lastState: "",
  //         lastProperty: "",
  //         parentContext: null,
  //         parentContextProperty: ""
  //       })
  //     ).toEqual({
  //       context: {},
  //       lastProperty: "",
  //       lastState: "CLOSE_CONTEXT",
  //       parentContext: {}, // TODO THIS MAYBE SHOULD BE NULL ON ROOT?
  //       parentContextProperty: "",
  //       remainingTokens: [],
  //       token: ""
  //     });
  //   });
  // });
  // describe("simple", () => {
  //   const rawFile = `(kicad_pcb())`;
  //   it("functionalParse", () => {
  //     const result = KicadPCB.funtionalParse(rawFile);
  //     expect(result).toEqual({
  //       kicad_pcb: {}
  //     });
  //   });
  //   it.only("functionalParseToken (", () => {
  //     expect(
  //       KicadPCB.functionParseToken({
  //         token: "(",
  //         remainingTokens: ["kicad_pcb", "(", ")", ")"],
  //         context: {},
  //         lastState: "",
  //         lastProperty: "",
  //         parentContext: null,
  //         parentContextProperty: ""
  //       })
  //     ).toEqual({
  //       context: { kicad_pcb: {} },
  //       lastProperty: "kicad_pcb",
  //       lastState: "CLOSE_CONTEXT",
  //       parentContext: null,
  //       parentContextProperty: "",
  //       remainingTokens: [],
  //       token: ")"
  //     });
  //   });
  //   it.only("functionalParseToken kicad_pcb", () => {
  //     expect(
  //       KicadPCB.functionParseToken({
  //         token: "kicad_pcb",
  //         remainingTokens: ["(", ")", ")"],
  //         context: {},
  //         lastState: "NEW_CONTEXT",
  //         lastProperty: "",
  //         parentContext: null,
  //         parentContextProperty: ""
  //       })
  //     ).toEqual({
  //       token: ")",
  //       remainingTokens: [")"], //TODO it should stop parsing once it finds its token match
  //       context: { kicad_pcb: {} },
  //       lastState: "CLOSE_CONTEXT",
  //       lastProperty: "kicad_pcb",
  //       parentContext: null,
  //       parentContextProperty: ""
  //     });
  //   });
  // });
  // it("1 nested", () => {
  //   const rawFile = `(kicad_pcb  (version 20171130) )`;
  //   const result = KicadPCB.funtionalParse(rawFile);
  //   expect(result).toEqual({
  //     kicad_pcb: {
  //       version: "20171130"
  //     }
  //   });
  // });
  // it("2 nested", () => {
  //   const rawFile = `(kicad_pcb  (version 20171130) (a 1) )`;
  //   const result = KicadPCB.funtionalParse(rawFile);
  //   expect(result).toEqual({
  //     kicad_pcb: {
  //       version: "20171130",
  //       a: "1"
  //     }
  //   });
  // });
  // it("2 nested array", () => {
  //   const rawFile = `(kicad_pcb  (version 20171130) (a d 1) )`;
  //   const pcb = new KicadPCB(rawFile);
  //   expect(pcb.parse()).toEqual({
  //     kicad_pcb: {
  //       version: "20171130",
  //       a: ["d", "1"]
  //     }
  //   });
  // });
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
