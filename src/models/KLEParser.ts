import { Key, Serial } from "@ijprest/kle-serial";
import { Grid } from "./Grid";
import { KeebKey } from "./KeebKey";
import { kleJSON } from "./kleJSON";
export default class KLEParser {
  private source: kleJSON;
  private sourceString: string;
  constructor(source: kleJSON) {
    this.sourceString = JSON.stringify(source);
    this.source = source;
  }

  private parse() {
    return Serial.parse(this.sourceString);
  }

  keebParse() {
    const gridIndex = new Grid();
    const keysOnly: Array<KeebKey> = [];
    this.source.forEach(
      (row: Array<string | object> | object, rowIndex: number) => {
        const isArray = Array.isArray(row);
        gridIndex.col = -1;
        if (isArray) {
          gridIndex.row++;
          const xx = row as Array<string | object>;
          xx.forEach((key: string | object, keyIndex: number) => {
            if (typeof key === "string") {
              gridIndex.col++;
              const keebKey = new KeebKey(key, {
                col: gridIndex.col,
                row: gridIndex.row
              });
              keysOnly.push(keebKey);
            }
          });
        }
      }
    );

    new KLEParser(this.source).parse().keys.map((key: Key, index: number) => {
      keysOnly[index].kleKey = key;
    });

    return keysOnly;
  }
}
