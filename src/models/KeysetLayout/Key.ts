import { Guid } from "guid-typescript";

export class Key {
  constructor(params: any = {}) {
    // init any params passed in
    for (const [k, v] of Object.entries(params)) {
      (<any>this)[k] = v;
    }

    //set an id if not passed in
    if (params.id === undefined) {
      this.id = Guid.create().toString();
    } else {
      this.id = params.id;
    }
  }

  public text: string = "";
  public meta: object = {};

  public x: number = 0;

  public fontSize: number = 12;
  public borderRadius: number = 5;

  public id: string;
  public y: number = 0;

  public font: string = "Verdana";

  public t1: string = "";
  public t2: string = "";
  public t3: string = "";
  public t4: string = "";
  public t5: string = "";
  public t6: string = "";
  public t7: string = "";
  public t8: string = "";
  public t9: string = "";

  public backgroundHex: string = "";
  public legendHex: string = "";

  public width: number = 1;
  public height: number = 1;
}
