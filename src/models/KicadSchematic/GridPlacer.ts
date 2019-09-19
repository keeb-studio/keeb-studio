import { IKey, ISchematicKey } from "../KeysetLayout/IGrid";
import MathHelper from "../MathHelper";

export default class GridPlacer {
  public static pad(
    keys: Array<IKey>,
    reset: boolean = true
  ): Array<ISchematicKey> {
    const allRows = [] as any;
    const rowIndex = {} as any;

    keys.forEach((key: IKey, index: number) => {
      const { schematic_y } = key;

      if (rowIndex[schematic_y] === undefined) {
        rowIndex[schematic_y] = [{ ...key, normalX: 0, normalY: 0 }];
        allRows.push(rowIndex[schematic_y]);
      } else {
        rowIndex[schematic_y].push({ ...key, normalX: 0, normalY: 0 });
      }
    });

    allRows.forEach((row: Array<ISchematicKey>, newY: number) => {
      row.sort((a, b) => {
        return a.schematic_x > b.schematic_x ? 1 : -1;
      });
    });

    let maxRow = 0;
    let newIndex = 0;
    allRows.forEach((row: Array<ISchematicKey>, newY: number) => {
      if (row.length > maxRow) {
        maxRow = row.length;
      }
      row.forEach((key: ISchematicKey, newX: number) => {
        key.normalX = newX;
        key.normalY = newY;
        key.index = newIndex++;

        const {
          x,
          y,
          width,
          height,
          rotation_x,
          rotation_y,
          rotation_angle
        } = key;

        const pcbCoreds = MathHelper.rotatedKicad(
          x,
          y,
          width || 1,
          height || 1,
          0,
          0,
          rotation_x || 0,
          rotation_y || 0,
          rotation_angle || 0
        );

        const { x: pcbRawX, y: pcbRawY, rotation: pcbRotation } = pcbCoreds;
        const pcbX = MathHelper.roundResult(pcbRawX);
        const pcbY = MathHelper.roundResult(pcbRawY);

        key.pcbX = pcbX;
        key.pcbY = pcbY;
        key.pcbRotation = pcbRotation;
      });
    });

    allRows.forEach((row: Array<ISchematicKey>) => {
      if (row.length < maxRow && reset) {
        const pad = Math.floor((maxRow - row.length) / 2);
        row.forEach((key: ISchematicKey) => {
          key.normalX = key.normalX + pad;
        });
      }
    });

    return allRows.flatMap((x: any) => x);
  }
}
