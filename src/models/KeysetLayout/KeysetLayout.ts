import { Key, Serial } from "@/LocalKleSerial";
import { kleJSON } from "../KLE/kleJSON";
import { Grid } from "./Grid";
import { KeebKey } from "./KeebKey";
import { SimpleKey } from "./SimpleKey";

export default class KeysetLayout {
  private kleParsed: kleJSON;
  private allRows: KeebKey[][] = [];
  constructor(params: IKeysetLayout) {
    const { raw } = params;
    this.kleParsed = JSON.parse(raw);
    // Serial.parse(raw);

    this.allRows = [];
    const gridIndex = new Grid();

    let totalIndex = 0;
    this.kleParsed.forEach(
      (row: Array<string | object> | object, rowIndex: number) => {
        const keebRow: KeebKey[] = [];
        const isArray = Array.isArray(row);
        gridIndex.col = -1;
        if (isArray) {
          gridIndex.row++;
          const arrayRow = row as Array<string | object>;
          // each key
          arrayRow.forEach((key: string | object, keyIndex: number) => {
            if (typeof key === "string") {
              gridIndex.col++;
              const keebKey = new KeebKey(
                key,
                {
                  col: gridIndex.col,
                  row: gridIndex.row
                },
                totalIndex
              );
              keebRow.push(keebKey);

              totalIndex++;
            }
          });
          this.allRows.push(keebRow);
        }
      }
    );

    const kleSerail = Serial.parse(raw);

    kleSerail.keys.map((key: Key, index: number) => {
      this.findKey(index, this.allRows).kleKey = key;
    });
  }

  public findKey(index: number, allRows: KeebKey[][]) {
    let x = -1;
    let found = new KeebKey("", { row: 0, col: 0 }, 0);
    allRows.map((row: KeebKey[]) => {
      row.map((key: KeebKey) => {
        x++;
        if (x === index) {
          found = key;
        }
      });
    });
    return found;
  }

  public static getAll(raw: string): Array<SimpleKey> {
    return new KeysetLayout({ raw }).allRows.flatMap((k: KeebKey[]) =>
      k.map((k2: KeebKey, index: number) => {
        const params = {
          // ...k2,
          // ...k2.kleKey,
          x: k2.x,
          y: k2.y,
          schematic_index: index,
          schematic_x: k2.gridIndex.col,
          schematic_y: k2.gridIndex.row,
          width: k2.kleKey.width,
          height: k2.kleKey.height,
          rotation_angle: k2.kleKey.rotation_angle,
          rotation_x: k2.kleKey.rotation_x,
          rotation_y: k2.kleKey.rotation_y,
          t1: k2.kleKey.labels[0] || "",
          t2: k2.kleKey.labels[1] || "",
          t3: k2.kleKey.labels[2] || "",
          t4: k2.kleKey.labels[3] || "",
          t5: k2.kleKey.labels[4] || "",
          t6: k2.kleKey.labels[5] || "",
          t7: k2.kleKey.labels[6] || "",
          t8: k2.kleKey.labels[7] || "",
          t9: k2.kleKey.labels[8] || "",
          // color: k2.kleKey.default.textColor,
          backgroundHex: k2.kleKey.color,
          kColor: k2.kleKey.color,
          kTextColor: k2.kleKey.default.textColor,
          kTextSize: k2.kleKey.default.textSize
        };
        return new SimpleKey(params);
      })
    );
  }
}

interface IKeysetLayout {
  raw: string;
}
