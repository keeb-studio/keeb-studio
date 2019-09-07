import { Key, Serial } from "@ijprest/kle-serial";
import { Grid } from "../Grid";
import { KeebKey } from "../KeebKey";
import { kleJSON } from "../kleJSON";

export default class KeysetLayout {
  kleParsed: kleJSON;
  private allRows: Array<Array<KeebKey>> = [];
  constructor(params: iKeysetLayout) {
    const { raw } = params;
    this.kleParsed = JSON.parse(raw);
    // Serial.parse(raw);

    this.allRows = [];
    const gridIndex = new Grid();

    let totalIndex = 0;
    this.kleParsed.forEach(
      (row: Array<string | object> | object, rowIndex: number) => {
        const keebRow: Array<KeebKey> = [];
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
    return this.allRows.flatMap((row: Array<KeebKey>) =>
      row.map((key: KeebKey) => key)
    );
  }

  public positions() {
    return this.allRows.flatMap((row: Array<KeebKey>) =>
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

  findKey(index: number, allRows: Array<Array<KeebKey>>) {
    let x = -1;
    let found = new KeebKey("", { row: 0, col: 0 }, 0);
    allRows.map((row: Array<KeebKey>) => {
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

interface iKeysetLayout {
  raw: string;
}
