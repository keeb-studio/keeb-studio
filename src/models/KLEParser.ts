import { Key, Keyboard, Serial } from "@ijprest/kle-serial";

export default class KLEParser {
  private source: string;
  private parsed: Keyboard;
  constructor(source: string) {
    this.source = source;
    this.parsed = Serial.parse(this.source);
  }

  parse() {
    return this.parsed;
  }

  keebParse(kle: Array<object | Array<object | string>>) {
    const gridIndex = new Grid();
    const keysOnly: Array<KeebKey> = [];
    kle.forEach((row: Array<string | object> | object, rowIndex: number) => {
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
    });

    new KLEParser(JSON.stringify(kle))
      .parse()
      .keys.map((key: Key, index: number) => {
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
