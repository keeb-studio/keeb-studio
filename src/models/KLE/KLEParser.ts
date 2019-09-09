import { Key, Serial } from "@ijprest/kle-serial";
import "core-js/fn/array/flat-map";
import { Grid } from "../KeysetLayout/Grid";
import { KeebKey } from "../KeysetLayout/KeebKey";
import { kleJSON } from "../KLE/kleJSON";
export default class KLEParser {
  private source: kleJSON;
  private sourceString: string;
  private allRows: KeebKey[][] = [];
  constructor(source: kleJSON) {
    this.sourceString = JSON.stringify(source);
    this.source = source;
  }

  public keebParse() {
    this.pkeebParse();
    let maxLength = 0;

    this.allRows.map((row: KeebKey[]) => {
      let rowLength = 0;
      row.map((key: KeebKey) => {
        rowLength++;
        if (rowLength > maxLength) {
          maxLength = rowLength;
        }
      });
      return rowLength;
    });

    this.allRows.forEach((row: KeebKey[], index: number) => {
      const pad = Math.floor((maxLength - row.length) / 2);
      row.forEach((key: KeebKey) => {
        key.gridIndex.col = key.gridIndex.col + pad;
      });
    });

    return this.returnAllRows();
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

  private parse() {
    return Serial.parse(this.sourceString);
  }

  private pkeebParse() {
    this.allRows = [];
    const gridIndex = new Grid();
    // each row
    let totalIndex = 0;
    this.source.forEach(
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

    new KLEParser(this.source).parse().keys.map((key: Key, index: number) => {
      this.findKey(index, this.allRows).kleKey = key;
    });

    return this.returnAllRows();
  }

  private returnAllRows() {
    return this.allRows.flatMap((row: KeebKey[]) =>
      row.map((key: KeebKey) => key)
    );
  }
}
