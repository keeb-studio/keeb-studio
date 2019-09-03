import { Section } from "./Section";
export class Module extends Section {
  public name: string;
  public type: string;
  public position: string;
  constructor(lines: Array<string>) {
    super(lines);

    const nameLine = lines.find((line: string) => {
      return line.indexOf("fp_text reference") > -1;
    });

    this.name = "";
    if (nameLine) {
      var regex = /(?<=fp_text reference\ )(.*)(?=\ \(.*\()/;
      const name = nameLine.match(regex);
      if (name) {
        this.name = name[0].toString();
      }
    }

    const typeLine = lines.find((line: string) => {
      return line.indexOf("fp_text value") > -1;
    });

    this.type = "";
    if (typeLine) {
      var regex = /(?<=fp_text value\ )(.*)(?=\ \(.*\()/;
      const type = typeLine.match(regex);
      if (type) {
        this.type = type[0].toString();
      }
    }

    const positionLine = lines.find((line: string) => {
      return line.indexOf("(at ") > -1;
    });
    this.position = "";
    if (positionLine) {
      var regex = /(?<=\(at\ )(.*)(?=\))/;
      const position = positionLine.match(regex);
      if (position) {
        this.position = position[0].toString();
      }
      console.log(this.position);
    }
  }
}
