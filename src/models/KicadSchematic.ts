import { readFileSync } from "fs";
import { KicadComponent } from "./KicadComponent";
import { KicadWire } from "./KicadWire";

export default class KicadSchematic {
  public path: string;
  public rawFile: string;
  public sections: Array<any> = [];
  public switchTemplate: KicadComponent;
  public diodeTemplate: KicadComponent;
  public wireTemplate: KicadWire;
  public wires: Array<any> = [];
  constructor(path: string = "") {
    this.path = path;
    this.rawFile = readFileSync(path, "utf8");
    this.switchTemplate = new KicadComponent();
    this.diodeTemplate = new KicadComponent();
    this.wireTemplate = new KicadWire();
    this.parseLines();
  }

  render() {
    // have to add back a newline
    return [
      ...flatMap(this.sections, (x: any) => {
        return x.component === null
          ? x.lines
          : x.component.lines.map((x: any) => {
              return x.updatedLine();
            });
      }),
      ""
    ].join("\n");
  }

  findComponentById(id: string) {
    const found = this.sections.find((x: any) => {
      return x.component !== null && x.component.uid === id;
    });
    if (found) {
      return found.component;
    }
    throw new Error(`component with id:${id} not found`);
  }

  getConnectingWire(mx: KicadComponent, diode: KicadComponent): KicadWire {
    // find position to conenct wire to mx based on template
    const mxPos = this.switchTemplate.position;
    const wireMxPos = this.wireTemplate.position;
    const mxXOffset = mxPos.x - wireMxPos.x;
    const mxYOffset = mxPos.y - wireMxPos.y;
    const mxWirePos = {
      x: mx.position.x - mxXOffset,
      y: mx.position.y - mxYOffset
    };

    // find position to conenct wire to diode based on template
    const diodePos = this.diodeTemplate.position;
    const wirediodePos = this.wireTemplate.position2;
    const diodeXOffset = diodePos.x - wirediodePos.x;
    const diodeYOffset = diodePos.y - wirediodePos.y;
    const diodeWirePos = {
      x: diode.position.x - diodeXOffset,
      y: diode.position.y - diodeYOffset
    };
    return new KicadWire(null, mxWirePos, diodeWirePos);
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
    let diodeTemplate = new KicadComponent();
    lines.forEach(line => {
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
    this.diodeTemplate = diodeTemplate;
    this.sections = sections;
    this.wireTemplate = this.findComponentById("wire");
  }
}

export function flatMap<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U[]
): U[] {
  return Array.prototype.concat(...array.map(callbackfn));
}
