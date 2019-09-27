import { IDimension } from "../interfaces/iDimension";
import { IPointRotated } from "../interfaces/iPoint";
export class KicadPeice {
  public original: string = "";
  public templateOriginPosition: IPointRotated = { x: 0, y: 0, rotation: 0 };
  public x: number = 0;
  public y: number = 0;
  public rotation: number = 0;
  public xOffset: number = 0;
  public yOffset: number = 0;
  public template: string = "";
  public hasPosition: boolean = false;
  public newUid: string;
  public hasDigits: boolean = false;
  public hasLabel: boolean = false;
  public label: string;
  public labelHolder: string = "TEMPLATE_LABEL";
  public uid: string;
  public neverReposition: boolean;
  public gridSize: IDimension = { width: 1, height: 1 };
  public keyWidth: number;
  constructor(
    original: string,
    templateOriginPosition: IPointRotated,
    label: string,
    uid: string,
    newUid: string,
    gridSize: IDimension,
    keyWidth: number,
    neverReposition: boolean
  ) {
    this.keyWidth = keyWidth;
    this.gridSize = gridSize;
    this.uid = uid;
    this.newUid = newUid;
    this.label = label;
    this.original = original;
    this.templateOriginPosition = {
      x: templateOriginPosition.x,
      y: templateOriginPosition.y,
      rotation: templateOriginPosition.rotation
    };
    this.neverReposition = neverReposition;

    const digitsRegex = / \d+/g;
    const digits = original.match(digitsRegex);

    const partType = original.charAt(0);
    if (digits && !neverReposition) {
      // convert digitis to ints
      const intDigits = digits.map((d: string) => Number.parseInt(d, 10));

      // find out if we need to ignore it because
      // it doesn't actually have x & y in it
      let ignore = true;
      let isMxFootPrint = false;
      let newLabel = original;
      if (["P", "F", "D"].includes(partType)) {
        ignore = false;
      }
      if (
        !["P", "F", "D", "U"].includes(partType) &&
        intDigits[0] !== 0 &&
        intDigits[1] !== 0
      ) {
        ignore = false;
      }

      // determine which numbers are x and y
      let xIndex = 0;
      if (partType === "F" && !neverReposition) {
        xIndex = 1;
        if (original.indexOf("XMXFOOTPRINTX")) {
          isMxFootPrint = true;
        }
      }

      // if (partType === "U") {
      // }

      if (
        partType === "F" &&
        original.charAt(1) === " " &&
        original.charAt(2) === "0" &&
        !neverReposition
      ) {
        this.hasLabel = true;

        // the label
        newLabel = original
          // .replace("MX0", this.labelHolder)
          .replace("MX0", `MX${this.labelHolder}`)
          .replace("D?", `D${this.labelHolder}`);
      }
      if (!ignore && !neverReposition) {
        this.hasDigits = true;
        this.hasPosition = true;
        this.x = intDigits[xIndex];
        this.y = intDigits[xIndex + 1];

        if (intDigits.length === 3) {
          this.rotation = intDigits[xIndex + 2];
        }
        this.xOffset = this.x - templateOriginPosition.x;
        this.yOffset = this.y - templateOriginPosition.y;

        this.template =
          this.rotation === 0
            ? newLabel
                .replace(`${this.x}`, "templateX")
                .replace(`${this.y}`, "templateY")
            : newLabel
                .replace(`${this.x}`, "templateX")
                .replace(`${this.y}`, "templateY")
                .replace(`${this.rotation}`, "templateRotation");
      }
    } else if (partType === "L" && !neverReposition) {
      let newLabel = original;
      // the label
      newLabel = original
        // .replace("MX0", this.labelHolder)
        .replace("MX0", `MX${this.labelHolder}`)
        .replace("D?", `D${this.labelHolder}`);
      this.template = newLabel;
      this.hasLabel = true;
    } else {
      this.hasDigits = false;
    }
  }
  public updatedLine() {
    let newX = this.templateOriginPosition.x + this.xOffset;
    let newY = this.templateOriginPosition.y + this.yOffset;

    newX = parseInt((this.x + this.xOffset).toFixed(0), 10);

    newY = parseInt((this.y + this.yOffset).toFixed(0), 10);

    let template = this.template;

    if (template.indexOf("XMXFOOTPRINTX") > -1) {
      template = template.replace("XMXFOOTPRINTX", getPeiceSize(this.keyWidth));
    }

    if (this.hasLabel) {
      template = template.replace(this.labelHolder, this.label);
      if (!this.hasDigits) {
        return template;
      }
    }

    if (!this.hasDigits) {
      return this.original.replace(this.uid, this.newUid);
    }

    return this.rotation === 0
      ? template
          .replace("templateX", newX.toString())
          .replace("templateY", newY.toString())
          .replace("templateRotation", "")
      : template
          .replace("templateX", newX.toString())
          .replace("templateY", newY.toString())
          .replace("templateRotation", this.rotation.toString());
  }
}

export function getPeiceSize(width: number): string {
  const supported = [1.25, 1.5, 1.75, 2, 2.25, 2.75, 6.25, 7];
  if (supported.includes(width)) {
    return (width * 100).toString();
  }
  return "100";
}
