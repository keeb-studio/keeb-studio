import { IKey, ISchematicKey } from "../KeysetLayout/IGrid";
import MathHelper from "../MathHelper";

export default class GridPlacer {
  public static pad(
    keys: Array<IKey>,
    reset: boolean = true
  ): Array<ISchematicKey> {
    const allRows = [] as any;
    const rowIndex = {} as any;

    const allOptionRows = [] as any;
    const rowOptionIndex = {} as any;

    keys.forEach((key: IKey, index: number) => {
      const { schematic_y } = key;

      if (!key.optionFor) {
        if (rowIndex[schematic_y] === undefined) {
          rowIndex[schematic_y] = [{ ...key, normalX: 0, normalY: 0 }];
          allRows.push(rowIndex[schematic_y]);
        } else {
          rowIndex[schematic_y].push({ ...key, normalX: 0, normalY: 0 });
        }
      } else {
        if (rowOptionIndex[schematic_y] === undefined) {
          rowOptionIndex[schematic_y] = [{ ...key, normalX: 0, normalY: 0 }];
          allOptionRows.push(rowOptionIndex[schematic_y]);
        } else {
          rowOptionIndex[schematic_y].push({ ...key, normalX: 0, normalY: 0 });
        }
      }
    });

    // sort
    allRows.forEach((row: Array<ISchematicKey>, newY: number) => {
      row.sort((a, b) => {
        return a.schematic_x > b.schematic_x ? 1 : -1;
      });
    });

    allOptionRows.forEach((row: Array<ISchematicKey>, newY: number) => {
      row.sort((a, b) => {
        return a.schematic_x > b.schematic_x ? 1 : -1;
      });
    });

    let maxRow = 0;
    let maxCol = 0;
    let newIndex = 0;
    allRows.forEach((row: Array<ISchematicKey>, newY: number) => {
      if (row.length > maxRow) {
        maxRow = row.length;
      }
      row.forEach((key: ISchematicKey, newX: number) => {
        key.normalX = newX;
        key.normalY = newY;
        if (!key.optionFor) {
          key.index = newIndex++;
        } else {
          key.index = -1;
        }

        let {
          width,
          height,
          x,
          y,
          rotation_x,
          rotation_y,
          rotation_angle,
          optionFor
        } = key;

        // TODO determine if strings are still making it in
        width = parseFloat(width as any);
        height = parseFloat(height as any);
        x = parseFloat(x as any);
        y = parseFloat(y as any);
        rotation_x = parseFloat(rotation_x as any);
        rotation_y = parseFloat(rotation_y as any);
        rotation_angle = parseFloat(rotation_angle as any);

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
        // TODO remove when jack is finished or converted
        key.optionFor = optionFor || null;
      });
    });

    allOptionRows.forEach((row: Array<ISchematicKey>, newY: number) => {
      if (row.length > maxRow) {
        maxRow = row.length;
      }
      row.forEach((key: ISchematicKey, newX: number) => {
        key.normalX = newX;
        key.normalY = newY + maxRow + 1;
        key.index = newIndex++;

        const {
          x,
          y,
          width,
          height,
          rotation_x,
          rotation_y,
          rotation_angle
        } = key.optionFor as any;

        const pcbCoreds = MathHelper.rotatedKicad(
          x,
          y,
          key.width || 1,
          key.height || 1,
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

        // TODO remove when jack is finished or converted
        // key.optionFor = optionFor || null;
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

    return [
      ...allRows.flatMap((x: any) => x),
      ...allOptionRows.flatMap((x: any) => x)
    ];
  }
}
