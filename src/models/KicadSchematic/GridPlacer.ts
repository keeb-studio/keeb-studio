import { IGridRotated, ISchematicKey } from "../KeysetLayout/IGrid";

export default class GridPlacer {
  public static pad(keys: Array<IGridRotated>): Array<IGridRotated> {
    const allRows = [] as any;
    const rowIndex = {} as any;

    keys.forEach((key: IGridRotated, index: number) => {
      if (rowIndex[key.y] === undefined) {
        rowIndex[key.y] = [key];
        allRows.push(rowIndex[key.y]);
      } else {
        rowIndex[key.y].push(key);
      }
    });

    let maxRow = 0;
    allRows.forEach((row: Array<ISchematicKey>) => {
      if (row.length > maxRow) {
        maxRow = row.length;
      }
    });

    allRows.forEach((row: Array<ISchematicKey>) => {
      if (row.length < maxRow) {
        const pad = Math.floor((maxRow - row.length) / 2);
        row.forEach((key: ISchematicKey) => {
          key.x = key.x + pad;
        });
      }
    });
    return allRows.flatMap((x: any) => x);
  }
}
