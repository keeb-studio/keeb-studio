import { IPoint } from "./iPoint";
export class KicadPeice {
  public original: string = "";
  public templateOriginPosition: IPoint = { x: 0, y: 0 };
  public x: number = 0;
  public y: number = 0;
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
  constructor(
    original: string,
    templateOriginPosition: IPoint,
    label: string,
    uid: string,
    newUid: string
  ) {
    this.uid = uid;
    this.newUid = newUid;
    this.label = label;
    this.original = original;
    this.templateOriginPosition = {
      x: templateOriginPosition.x,
      y: templateOriginPosition.y
    };

    const digitsRegex = /\ \d+/g;
    const digits = original.match(digitsRegex);

    const partType = original.charAt(0);
    if (digits) {
      // convert digitis to ints
      const intDigits = digits.map((d: string) => Number.parseInt(d, 10));

      // find out if we need to ignore it because
      // it doesn't actually have x & y in it
      let ignore = true;
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
      if (partType === "F") {
        xIndex = 1;
      }

      // if (partType === "U") {
      // }

      if (
        partType === "F" &&
        original.charAt(1) === " " &&
        original.charAt(2) === "0"
      ) {
        this.hasLabel = true;

        // the label
        newLabel = original
          // .replace("MX1", this.labelHolder)
          .replace("MX1", `MX${this.labelHolder}`)
          .replace("D?", `D${this.labelHolder}`);
      }
      if (!ignore) {
        this.hasDigits = true;
        this.hasPosition = true;
        this.x = intDigits[xIndex];
        this.y = intDigits[xIndex + 1];

        this.xOffset = this.x - templateOriginPosition.x;
        this.yOffset = this.y - templateOriginPosition.y;

        this.template = newLabel
          .replace(`${this.x}`, "templateX")
          .replace(`${this.y}`, "templateY");
      }
    } else if (partType === "L") {
      let newLabel = original;
      // the label
      newLabel = original
        // .replace("MX1", this.labelHolder)
        .replace("MX1", `MX${this.labelHolder}`)
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

    let foo = this.template;
    if (this.hasLabel) {
      foo = foo.replace(this.labelHolder, this.label);
      if (!this.hasDigits) {
        return foo;
      }
    }

    return this.hasDigits
      ? foo
          .replace("templateX", newX.toString())
          .replace("templateY", newY.toString())
      : this.original.replace(this.uid, this.newUid);
  }
}
