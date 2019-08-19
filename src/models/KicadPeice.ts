import { iPoint } from "./iPoint";
export class KicadPeice {
  public original: string = "";
  public templateOriginPosition: iPoint = { x: 0, y: 0 };
  public x: number = 0;
  public y: number = 0;
  public xOffset: number = 0;
  public yOffset: number = 0;
  public template: string = "";
  public hasPosition: boolean = false;
  hasDigits: boolean = false;
  constructor(original: string, templateOriginPosition: iPoint) {
    this.original = original;
    this.templateOriginPosition = templateOriginPosition;
    const digitsRegex = /\ \d+/g;
    const digits = original.match(digitsRegex);

    const partType = original.charAt(0);
    if (digits) {
      //convert digitis to ints
      const intDigits = digits.map((x: string) => Number.parseInt(x));

      // find out if we need to ignore it because
      // it doesn't actually have x & y in it
      let ignore = true;
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
      if (!ignore) {
        this.hasDigits = true;
        this.hasPosition = true;
        this.x = intDigits[xIndex];
        this.y = intDigits[xIndex + 1];

        this.xOffset = this.x - templateOriginPosition.x;
        this.yOffset = this.y - templateOriginPosition.y;

        this.template = original
          .replace(`${this.x}`, "templateX")
          .replace(`${this.y}`, "templateY");
      }
    } else {
      this.hasDigits = false;
    }
  }
  public updatedLine() {
    let newX = this.templateOriginPosition.x + this.xOffset;
    let newY = this.templateOriginPosition.y + this.yOffset;

    newX = parseInt((this.x + this.xOffset).toFixed(0));

    newY = parseInt((this.y + this.yOffset).toFixed(0));

    return this.hasDigits
      ? this.template
          .replace("templateX", newX.toString())
          .replace("templateY", newY.toString())
      : this.original;
  }
}
