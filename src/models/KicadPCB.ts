export default class KicadPCB {
  private result: any = null;
  parentContext: Array<any> = [];
  context: any = null;

  currentContextNameSet: boolean = false;
  currentContextValueSet: boolean = false;
  currentName: string = "";

  static NOTSET = "asldkjasldkasjdlkasd";
  constructor(content: string) {
    const lines = content.split(/\r?\n/);

    const tokenLines: Array<Array<string>> = lines
      .map((line: string, index: number) => {
        line = line.replace(/#.*$/, "");
        return line.split(/([()]|"(?:\\"|[^"])*")|\s+/).filter(t => !!t);
      })
      .filter(t => t.length > 0);

    tokenLines.forEach((line: Array<string>) =>
      line.forEach((token: string) => {
        this.handleToken(token);
      })
    );

    this.result = this.context.foo;
  }

  handleToken(token: string) {
    // opening a context
    if (token === "(") {
      if (this.context === null) {
        this.context = { foo: {}, currentName: false };
      } else {
        this.parentContext.push(this.context);
        if (this.context.foo[this.context.currentName] === KicadPCB.NOTSET) {
          this.context = { foo: {}, currentName: false };
        } else {
          console.log("it is set", this.context);
          // todo determine that even though it is set
          // we still should open new context

          // this context is already set so we return to it
          // and then should push next value to it
          this.context = {
            foo: this.context.foo[this.context.currentName],
            currentName: false
          };
        }
      }
    }
    //  closing a context
    else if (token === ")") {
      if (this.parentContext.length > 0) {
        let contextParent = this.parentContext.pop();

        if (contextParent.foo[contextParent.currentName] === KicadPCB.NOTSET) {
          contextParent.foo[contextParent.currentName] = this.context.foo;
        }

        this.context = contextParent;
      }
    }
    // setting a property or value
    else {
      // add the property

      if (!this.context.currentName) {
        // console.log(this.context);
        this.context.currentName = token;
        this.context.foo[token] = KicadPCB.NOTSET;
      }
      // set the property for the first time
      else if (this.context.foo[this.context.currentName] === KicadPCB.NOTSET) {
        this.context.foo[this.context.currentName] = token;
      } else {
        const currentValue = this.context.foo[this.context.currentName];

        let newValue = Array.isArray(currentValue)
          ? [...currentValue, token]
          : [...[currentValue], token];

        this.context.foo[this.context.currentName] = newValue;
      }
    }
  }

  parse() {
    return this.result;
  }
}
