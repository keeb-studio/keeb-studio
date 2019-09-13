import { IPoint } from "./interfaces/iPoint";
import { IGrid, IGridRotated } from "./KeysetLayout/IGrid";

const KEYSIZE = 19.05;
export default class MathHelper {
  public static degreesToRadians(deg: number): number {
    return this.round4Places((deg * Math.PI) / 180);
  }

  public static keyGridToMM(inputX: number, inputY: number): IGrid {
    const x = this.round4Places(inputX * KEYSIZE);
    const y = this.round4Places(inputY * KEYSIZE);
    return { x, y };
  }

  public static round4Places(x: number): number {
    return parseFloat(x.toFixed(4));
  }

  public static findCenter(
    kleX: number,
    kleY: number,
    kleWidth: number,
    kleHeight: number
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

    return { x: this.round4Places(mids.x), y: this.round4Places(mids.y) };
  }

  public static keyPcbPosition(
    kleX: number,
    kleY: number,
    kleWidth: number,
    kleHeight: number,
    kicadOriginX: number = 0,
    kicadOriginY: number = 0
  ) {
    const { x, y } = this.findCenter(kleX, kleY, kleWidth, kleHeight);
    return { x: x + kicadOriginX, y: y + kicadOriginY };
  }

  // angle = (angle ) * (Math.PI/180); // Convert to radians
  public static rotatePoint(
    point_x: number,
    point_y: number,
    rotation_x: number,
    rotation_y: number,
    rotation_degrees: number
  ): IGridRotated {
    const rotation = rotation_degrees;
    const angle = (rotation * Math.PI) / 180;

    const point = { x: point_x, y: point_y };
    const center = { x: rotation_x, y: rotation_y };

    var rotatedX =
      Math.cos(angle) * (point.x - center.x) -
      Math.sin(angle) * (point.y - center.y) +
      center.x;

    var rotatedY =
      Math.sin(angle) * (point.x - center.x) +
      Math.cos(angle) * (point.y - center.y) +
      center.y;

    // // angle sin and cosin
    // const s = Math.sin(angle);
    // const c = Math.cos(angle);

    // // translate point back to origin:
    // const x1 = (point_x = point_x - rotation_x);
    // const y1 = (point_y = point_y - rotation_y);

    // // rotate point
    // const xnew = x1 * c - y1 * s;
    // const ynew = x1 * s + y1 * c;

    const x = rotatedX * KEYSIZE;
    const y = rotatedY * KEYSIZE;
    return { x, y, rotation };
  }
}
