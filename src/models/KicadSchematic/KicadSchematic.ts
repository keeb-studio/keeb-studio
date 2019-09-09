import cryptoRandomString from "crypto-random-string";
import { readFileSync, writeFileSync } from "fs";
import { IDimension } from "../interfaces/iDimension";
import { IPoint } from "../interfaces/iPoint";
import { KeebKey } from "../KeysetLayout/KeebKey";
import { kleJSON } from "../KLE/kleJSON";
import KLEParser from "../KLE/KLEParser";
import { KicadComponent } from "./KicadComponent";
import { KicadWire } from "./KicadWire";
export default class KicadSchematic {
  public path: string;
  public rawFile: string;
  public sections: any[] = [];
  public switchTemplate: KicadComponent;
  public switchTemplate2: KicadComponent;
  public diodeTemplate: KicadComponent;
  public wireTemplate: KicadWire;
  public wireTemplates: KicadWire[] = [];
  public wires: any[] = [];
  public hexPrefix: string;
  constructor(path: string = "") {
    this.hexPrefix = cryptoRandomString({ length: 4 });
    this.path = path;
    this.rawFile = readFileSync(path, "utf8");
    this.switchTemplate = new KicadComponent();
    this.switchTemplate2 = new KicadComponent();
    this.diodeTemplate = new KicadComponent();
    this.wireTemplate = new KicadWire();
    this.parseLines();
  }

  public render() {
    // have to add back a newline
    return [
      ...flatMap(this.sections, (s: any) => {
        return s.component === null
          ? s.lines
          : s.component.lines.map((l: any) => {
              return l.updatedLine();
            });
      }),
      ""
    ].join("\n");
  }

  public findComponentById(id: string, index: number = 1) {
    const matching = this.sections.filter((s: any) => {
      return s.component !== null && s.component.uid === id;
    });

    if (matching.length > 0) {
      return matching[index - 1].component;
    }
    throw new Error(`component with id:${id} not found`);
  }

  public getConnectingWire(
    mx: KicadComponent,
    diode: KicadComponent,
    wireTemplate: KicadWire
  ): KicadWire {
    // find position to conenct wire to mx based on template
    const mxPos = this.switchTemplate.position;
    const wireMxPos = wireTemplate.position;
    const mxXOffset = mxPos.x - wireMxPos.x;
    const mxYOffset = mxPos.y - wireMxPos.y;
    const mxWirePos = {
      x: mx.position.x - mxXOffset,
      y: mx.position.y - mxYOffset
    };

    // find position to conenct wire to diode based on template
    const diodePos = this.diodeTemplate.position;
    const wirediodePos = wireTemplate.position2;
    const diodeXOffset = diodePos.x - wirediodePos.x;
    const diodeYOffset = diodePos.y - wirediodePos.y;
    const diodeWirePos = {
      x: diode.position.x - diodeXOffset,
      y: diode.position.y - diodeYOffset
    };
    return new KicadWire(null, mxWirePos, diodeWirePos);
  }

  public getSwitch(location: IPoint, label: string) {
    const mx = new KicadComponent(
      this.switchTemplate.rawLines,
      label,
      { x: -1, y: -1 }, // using defaults todo refactor to named
      { width: 1, height: 1 },
      this.hexPrefix
    );
    const grid = this.getGridDimensions();

    mx.updateLines({
      x: mx.position.x + location.x * grid.width,
      y: mx.position.y + location.y * grid.height
    });

    return mx;
  }

  public getDiode(location: IPoint, label: string) {
    const mx = new KicadComponent(
      this.diodeTemplate.rawLines,
      label,
      { x: -1, y: -1 }, // using defaults todo refactor to named
      { width: 1, height: 1 },
      this.hexPrefix
    );
    const grid = this.getGridDimensions();

    mx.updateLines({
      x: mx.position.x + location.x * grid.width,
      y: mx.position.y + location.y * grid.height
    });

    return mx;
  }

  public getGridDimensions(): IDimension {
    return {
      width: this.switchTemplate2.position.x - this.switchTemplate.position.x,
      height: this.switchTemplate2.position.y - this.switchTemplate.position.y
    };
  }

  public getWithKLE(kle: kleJSON) {
    this.removeCompAndWires();
    const keys = new KLEParser(kle).keebParse();
    const closing = this.sections.pop();

    keys.forEach((keebKey: KeebKey, index: number) => {
      if (keebKey.isSpacer === false) {
        const label = (index + 1).toString();
        const x = keebKey.gridIndex.col;
        const y = keebKey.gridIndex.row;
        const mxSwitch = this.getSwitch({ x, y }, label);
        this.sections.push({
          type: "comp",
          component: mxSwitch,
          lines: mxSwitch.lines
        });

        const diode = this.getDiode({ x, y }, label);
        this.sections.push({
          type: "comp",
          component: diode,
          lines: diode.lines
        });

        this.wireTemplates.forEach((wireTemplate: any) => {
          const wire = this.getConnectingWire(mxSwitch, diode, wireTemplate);
          this.sections.push({ type: "wire", component: wire });
        });
      }
    });

    this.sections.push(closing);
    return this.render();
  }

  public writeFile(kle: kleJSON, path: string) {
    const content = this.getWithKLE(kle);
    writeFileSync(path, content);
  }

  public getEmpty() {
    this.removeCompAndWires();
    return [
      ...flatMap(this.sections, (s: any) => {
        return s.component === null
          ? s.lines
          : s.component.lines.map((l: any) => {
              return l.updatedLine();
            });
      }),
      ""
    ].join("\n");
  }
  /// private
  private parseLines() {
    const lines = this.rawFile.split(/\r?\n/);
    const sections: any = [];
    let currentSection: any = [];
    let section: any;
    let closeSection = false;
    let firstComponent = false;
    let firstComponentFound = false;
    let lastWasWire = false;
    let switchTemplate = new KicadComponent();
    let switchTemplate2 = new KicadComponent();
    let diodeTemplate = new KicadComponent();
    lines.forEach((line: any) => {
      closeSection = false;

      if (lastWasWire) {
        closeSection = true;
        section = "wire";
        lastWasWire = false;
      } else if (line.match(/\$Descr/)) {
        section = "descr";
        firstComponent = false;
        lastWasWire = false;
      } else if (line.match(/\$Comp/)) {
        if (firstComponentFound === false) {
          firstComponent = true;
          firstComponentFound = true;
        } else {
          firstComponent = false;
        }
        lastWasWire = false;
        section = "comp";
      } else if (line.match(/\$EndDescr/)) {
        lastWasWire = false;
        closeSection = true;
      } else if (line.match(/\$EndComp/)) {
        lastWasWire = false;
        closeSection = true;
      } else if (line.match(/Wire Wire Line/)) {
        section = "wire";
        lastWasWire = true;
      } else if (line.match(/\$EndSCHEMATC/)) {
        lastWasWire = false;
        section = "closing";
        closeSection = true;
      }

      currentSection.push(line);
      if (closeSection) {
        let component = null;

        if (section === "comp") {
          component = new KicadComponent(currentSection);
        } else if (section === "wire") {
          component = new KicadWire(currentSection);
        }

        sections.push({
          lines: currentSection,
          type: section,
          firstComponent,
          component
        });
        const label = currentSection[1];
        if (
          switchTemplate.uid === "" &&
          section === "comp" &&
          label.indexOf("MX") > -1
        ) {
          switchTemplate = new KicadComponent(currentSection);
        } else if (
          switchTemplate2.uid === "" &&
          section === "comp" &&
          label.indexOf("MX") > -1
        ) {
          switchTemplate2 = new KicadComponent(currentSection);
        }
        if (
          switchTemplate.uid === "" &&
          section === "comp" &&
          label.indexOf("D_Small") > -1
        ) {
          diodeTemplate = new KicadComponent(currentSection);
        }
        currentSection = [];
      }
    });

    this.switchTemplate = switchTemplate;
    this.switchTemplate2 = switchTemplate2;
    this.diodeTemplate = diodeTemplate;
    this.sections = sections;

    this.wireTemplate = this.findComponentById("wire");
    this.wireTemplates = [
      this.findComponentById("wire"),
      this.findComponentById("wire", 2),
      this.findComponentById("wire", 3),
      this.findComponentById("wire", 4),
      this.findComponentById("wire", 5)
    ];
  }

  private removeCompAndWires() {
    this.sections = this.sections.filter(
      (x: any) => x.type !== "comp" && x.type !== "wire"
    );
  }
}

export function flatMap<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U[]
): U[] {
  return Array.prototype.concat(...array.map(callbackfn));
}
