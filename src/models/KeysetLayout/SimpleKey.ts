import { Guid } from "guid-typescript";

export class SimpleKey {
  constructor(params: any = {}) {
    // init any params passed in
    for (const [k, v] of Object.entries(params)) {
      (this as any)[k] = v;
    }

    //set an id if not passed in
    if (params.id === undefined) {
      this.id = Guid.create().toString();
    } else {
      this.id = params.id;
    }
  }

  public schematic_x: number = -1;
  public schematic_y: number = -1;
  public schematic_index: number = -1;
  public optionFor: SimpleKey | null = null;
  public targetAlign: string = "left";

  public text: string = "";
  public meta: object = {};

  public x: number = 0;

  public fontSize: number = 12;
  public borderRadius: number = 5;

  public id: string | number;
  public y: number = 0;

  public font: string = "Verdana";

  public rotation_angle: number = 0;
  public rotation_x: number = 0;
  public rotation_y: number = 0;

  public color: string = "#cccccc";
  public textColor: string[] = [];

  public t1: string = "";
  public t2: string = "";
  public t3: string = "";
  public t4: string = "";
  public t5: string = "";
  public t6: string = "";
  public t7: string = "";
  public t8: string = "";
  public t9: string = "";

  public backgroundHex: string = "#cccccc";
  public legendHex: string = "";

  public width: number = 1;
  public height: number = 1;

  public kColor: string = "#000000";
  public kTextColor: string = "#cccccc";
  public kTextSize: string = "3";
}
