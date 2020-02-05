import { Serial } from "@/LocalKleSerial";

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

    it("can invert label and chop extra", () => {
      const labels = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ];

      expect(Serial.invertLabel(labels)).toEqual(
        "1\n7\n3\n9\n10\n12\n4\n6\n2\n5\n8\n11"
      );
    });
    it("can invert label", () => {
      const labels = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ];

      expect(Serial.invertLabel(labels)).toEqual(
        "1\n7\n3\n9\n10\n12\n4\n6\n2\n5\n8\n11"
      );
    });

    it("invertLabel can omit extra", () => {
      const labels = ["1", "", "3"];
      expect(Serial.invertLabel(labels)).toEqual("1\n\n3");
    });

    it("invertLabel can omit lots of extras", () => {
      const labels = ["1", "", "", "", "", "", "", "2"];
      const result = Serial.invertLabel(labels);
      expect(result).toEqual("1\n\n\n\n\n\n\n\n\n\n2");
    });

    it("invertLabel can can omit lots of extra with mids", () => {
      const labels = ["1", "", "4", "", "", "", "", "2", "", "5"];
      const result = Serial.invertLabel(labels);
      expect(result).toEqual("1\n\n4\n\n5\n\n\n\n\n\n2");
    });

    xit("foo 2", () => {
      const x = [[{ a: 0 }, "1\n\n4\n\n5\n\n\n\n\n\n2"]];
      const raw = JSON.stringify(x);
      const kleSerail = Serial.parse(raw);
      const flat = kleSerail.keys;
      const results = simplify(flat);
      console.log(results);
      // expect(results).toEqual([
      //   { x: 0, y: 0, width: 1, height: 1, labels: ["1"] }
      // ]);
      // Serial.serialize(kleSerail);
    });

    xit("foo", () => {
      const x = [[{ x: 1 }, "1", "2"]];
      const raw = JSON.stringify(x);
      const kleSerail = Serial.parse(raw);
      const flat = kleSerail.keys;
      // console.log(flat);
      const results = simplify(flat);
      expect(results).toEqual([
        { x: 1, y: 0, width: 1, height: 1, labels: ["1"] },
        { x: 2, y: 0, width: 1, height: 1, labels: ["2"] }
      ]);
      Serial.serialize(kleSerail);
    });
  });
});

function simplify(x: any) {
  return x.map((k: any) => {
    return {
      x: k.x,
      y: k.y,
      width: k.width,
      height: k.height,
      labels: k.labels
    };
  });
}
