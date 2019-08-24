import { Key, Serial } from "@ijprest/kle-serial";
export type kleJSON = Array<object | Array<object | string>>;
export default class KLEParser {
  private source: kleJSON;
  private sourceString: string;
  constructor(source: kleJSON) {
    this.sourceString = JSON.stringify(source);
    this.source = source;
  }

  parse() {
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
              const keebKey = new KeebKey(key, gridIndex);
              keysOnly.push(keebKey);
            }
          });
        }
      }
    );

    new KLEParser(this.source).parse().keys.map((key: Key, index: number) => {
      keysOnly[index].kleKey = key;
    });
  }
}

export class Grid {
  col: number = -1;
  row: number = -1;
}

export class KeebKey {
  label: string = "";
  kleKey?: Key;
  gridIndex: Grid = new Grid();
  constructor(key: string, gridIndex: Grid, kleKey?: Key) {
    this.label = key;
    this.gridIndex = gridIndex;
    this.kleKey = kleKey;
  }
}
