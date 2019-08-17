import { Serial } from "@ijprest/kle-serial";

export default class KLEParser {
  private source: string;
  constructor(source: string) {
    this.source = source;
  }
  parse() {
    return Serial.parse(this.source);
  }
}
