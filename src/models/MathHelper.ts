import { IPoint } from "./interfaces/iPoint";
import { IGrid } from "./KeysetLayout/IGrid";

const KEYSIZE = 19.05;
export default class MathHelper {
  public static keyGridToMM(inputX: number, inputY: number): IGrid {
    const x = inputX * KEYSIZE;
    const y = inputY * KEYSIZE;
    return { x, y };
  }

  public static roundResult(x: number): number {
    return parseFloat(x.toFixed(4));
  }

  public static findCorners(
    kleX: number,
    kleY: number,
    kleWidth: number,
    kleHeight: number,
    kicadOriginX: number,
    kicadOriginY: number
  ): any {
    const begin = { x: kleX, y: kleY };
    const end = { x: kleX + kleWidth, y: kleY + kleHeight };

    const pcbBegin = { x: begin.x * KEYSIZE, y: begin.y * KEYSIZE };
    const pcbEnd = { x: end.x * KEYSIZE, y: end.y * KEYSIZE };

    return {
      p0: { x: pcbBegin.x + kicadOriginX, y: pcbBegin.y + kicadOriginY },
      p1: { x: pcbEnd.x + kicadOriginX, y: pcbBegin.y + kicadOriginY },
      p2: { x: pcbEnd.x + kicadOriginX, y: pcbEnd.y + kicadOriginY },
      p3: { x: pcbBegin.x + kicadOriginX, y: pcbEnd.y + kicadOriginY }
    };
  }

  public static findCenter(
    kleX: number,
    kleY: number,
    kleWidth: number,
    kleHeight: number,
    kicadOriginX: number,
    kicadOriginY: number
  ): IPoint {
    const begin = { x: kleX, y: kleY };
    const end = { x: kleX + kleWidth, y: kleY + kleHeight };

    const pcbBegin = { x: begin.x * KEYSIZE, y: begin.y * KEYSIZE };
    const pcbEnd = { x: end.x * KEYSIZE, y: end.y * KEYSIZE };

    const adjust = {
      x: (pcbEnd.x - pcbBegin.x) / 2,
      y: (pcbEnd.y - pcbBegin.y) / 2
    };

    const mids = {
      x: pcbBegin.x + adjust.x,
      y: pcbBegin.y + adjust.y
    };

    return {
      x: mids.x + kicadOriginX,
      y: mids.y + kicadOriginY
    };
  }

  public static keyPcbPosition(
    kleX: number,
    kleY: number,
    kleWidth: number,
    kleHeight: number,
    kicadOriginX: number = 0,
    kicadOriginY: number = 0
  ) {
    const { x, y } = this.findCenter(
      kleX,
      kleY,
      kleWidth,
      kleHeight,
      kicadOriginX,
      kicadOriginY
    );
    return { x: x + kicadOriginX, y: y + kicadOriginY };
  }

  public static rotatePoint(
    point_x: number,
    point_y: number,
    rotation_x: number,
    rotation_y: number,
    rotation_degrees: number
  ): IGrid {
    const angle = rotation_degrees * (Math.PI / 180);
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const point = { x: point_x, y: point_y };
    const center = { x: rotation_x, y: rotation_y };

    const rotatedX =
      cos * (point.x - center.x) - sin * (point.y - center.y) + center.x;

    const rotatedY =
      sin * (point.x - center.x) + cos * (point.y - center.y) + center.y;

    const result = { x: rotatedX, y: rotatedY };
    return result;
  }

  public static rotationedCorners(
    kleX: number,
    kleY: number,
    kleWidth: number,
    kleHeight: number,
    kicadOriginX: number = 0,
    kicadOriginY: number = 0,
    rotation_x: number,
    rotation_y: number,
    rotation_degrees: number
  ): any {
    const pcb_rotation_x = this.keyGridToMM(rotation_x, rotation_y).x;
    const pcb_rotation_y = this.keyGridToMM(rotation_x, rotation_y).y;

    const corners = this.findCorners(
      kleX,
      kleY,
      kleWidth,
      kleHeight,
      kicadOriginX,
      kicadOriginY
    );

    let {
      p0: { x: x0, y: y0 },
      p1: { x: x1, y: y1 },
      p2: { x: x2, y: y2 },
      p3: { x: x3, y: y3 }
    } = corners;

    const p0 = this.rotatePoint(
      x0,
      y0,
      pcb_rotation_x,
      pcb_rotation_y,
      rotation_degrees
    );

    const p1 = this.rotatePoint(
      x1,
      y1,
      pcb_rotation_x,
      pcb_rotation_y,
      rotation_degrees
    );

    const p2 = this.rotatePoint(
      x2,
      y2,
      pcb_rotation_x,
      pcb_rotation_y,
      rotation_degrees
    );

    const p3 = this.rotatePoint(
      x3,
      y3,
      pcb_rotation_x,
      pcb_rotation_y,
      rotation_degrees
    );

    const result = { p0, p1, p2, p3 };
    return result;
  }

  public static rotatedKicad(
    kleX: number,
    kleY: number,
    kleWidth: number,
    kleHeight: number,
    kicadOriginX: number = 0,
    kicadOriginY: number = 0,
    rotation_x: number,
    rotation_y: number,
    rotation_degrees: number
  ): any {
    const corners = this.rotationedCorners(
      kleX,
      kleY,
      kleWidth,
      kleHeight,
      kicadOriginX,
      kicadOriginY,
      rotation_x,
      rotation_y,
      rotation_degrees
    );

    let rotation = rotation_degrees !== 0 ? 360 - rotation_degrees : 0;
    if (rotation > 360) {
      rotation -= 360;
    }
    return {
      x: (corners.p0.x + corners.p1.x + corners.p2.x + corners.p3.x) / 4,
      y: (corners.p0.y + corners.p1.y + corners.p2.y + corners.p3.y) / 4,
      rotation
    };
  }
}
