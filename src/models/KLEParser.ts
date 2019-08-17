import { Keyboard, Serial } from "@ijprest/kle-serial";

export default class KLEParser {
  private source: string;
  private parsed: Keyboard;
  constructor(source: string) {
    this.source = source;
    this.parsed = Serial.parse(this.source);
  }

  parse() {
    return this.parsed;
  }
}
