import { Key, Serial } from "@ijprest/kle-serial";
import { kleJSON } from "../KLE/kleJSON";
import { Grid } from "./Grid";
import { KeebKey } from "./KeebKey";

export default class KeysetLayout {
  public kleParsed: kleJSON;
  public allRows: KeebKey[][] = [];
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

  public keys() {
    return this.allRows.flatMap((row: KeebKey[]) =>
      row.map((key: KeebKey) => key)
    );
  }

  public positions() {
    return this.allRows.flatMap((row: KeebKey[]) =>
      row.map((key: KeebKey) => {
        return {
          x: key.x,
          y: key.y,
          index: key.index,
          label: key.label
        };
      })
    );
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
}

interface IKeysetLayout {
  raw: string;
}
