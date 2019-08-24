import { Key, Serial } from "@ijprest/kle-serial";
import { Grid } from "./Grid";
import { KeebKey } from "./KeebKey";
import { kleJSON } from "./kleJSON";
export default class KLEParser {
  private source: kleJSON;
  private sourceString: string;
  private allRows: Array<Array<KeebKey>> = [];
  constructor(source: kleJSON) {
    this.sourceString = JSON.stringify(source);
    this.source = source;
  }

  private parse() {
    return Serial.parse(this.sourceString);
  }

  keebParse() {
    this.allRows = [];
    const gridIndex = new Grid();
    //each row
    this.source.forEach(
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
              const keebKey = new KeebKey(key, {
                col: gridIndex.col,
                row: gridIndex.row
              });
              keebRow.push(keebKey);
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
    return this.allRows.map((row: Array<KeebKey>) =>
      row.map((key: KeebKey) => key)
    );
  }

  findKey(index: number, allRows: Array<Array<KeebKey>>) {
    let x = -1;
    let found = new KeebKey("", { row: 0, col: 0 });
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
