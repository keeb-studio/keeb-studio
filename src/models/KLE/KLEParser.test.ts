import KLEParser from "./KLEParser";

describe("KLEParser", () => {
  describe("keebParse", () => {
    const kle = [
      {
        name: "jack"
      },
      [
        "Esc",
        "!\n1",
        '"\n2',
        "£\n3",
        "$\n4",
        "%\n5",
        "^\n6",
        "&\n7",
        "*\n8",
        "(\n9",
        ")\n0",
        "_\n-",
        "+\n=",
        "|\n\\",
        "~",
        "Delete"
      ],
      [
        {
          w: 1.5
        },
        "Tab",
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P",
        "{\n[",
        "}\n]",
        {
          a: 6,
          w: 1.5
        },
        "Backspace",
        {
          a: 4
        },
        "Pg Up"
      ],
      [
        {
          w: 1.75
        },
        "Caps Lock",
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        ":\n;",
        "@\n'",
        {
          a: 6,
          w: 2.25
        },
        "Enter",
        {
          a: 4
        },
        "Pg Dn"
      ],
      [
        {
          w: 2.25
        },
        "Shift",
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M",
        "<\n,",
        ">\n.",
        "?\n/",
        {
          w: 1.75
        },
        "Shift",
        "Up",
        "Fn"
      ],
      [
        {
          w: 1.5
        },
        "Ctrl",
        {
          x: 0.75,
          w: 1.5
        },
        "Super",
        {
          a: 7,
          w: 7
        },
        "",
        {
          a: 4,
          w: 1.5
        },
        "Alt",
        {
          x: 0.75
        },
        "Left",
        "Down",
        "Right"
      ]
    ];
    //
    //
    // const kleString = JSON.stringify(kle);
    it("foo", () => {
      const parser = new KLEParser(kle);
      parser.keebParse();
    });

    it("from ", () => {
      //
    });
  });
});