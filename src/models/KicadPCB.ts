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
          this.context = {
            foo: this.context.foo[this.context.currentName],
            currentName: false
          };
        }
        // this.context = this.context.foo[this.context.currentName];
      }
    }
    //  closing a context
    else if (token === ")") {
      if (this.parentContext.length > 0) {
        let contextParent = this.parentContext.pop();
        if (contextParent.foo[contextParent.currentName] === KicadPCB.NOTSET) {
          // console.log("setting current in parent");
          contextParent.foo[contextParent.currentName] = this.context.foo;
        }
        this.context = contextParent;
      } else {
        // delete this.context.currentName;
      }
    }
    // setting a property or value
    else {
      // add the property

      if (!this.context.currentName) {
        this.context.currentName = token;
        this.context.foo[token] = KicadPCB.NOTSET;

        // console.log("add");
      }
      // set the property for the first time
      else if (this.context.foo[this.context.currentName] === KicadPCB.NOTSET) {
        this.context.foo[this.context.currentName] = token;

        // console.log("set");
      }
      // set a 2nd value to the prop as an array
      // else {
      //   const currentValue = this.context[this.context.currentName];
      //   let newValue = Array.isArray(currentValue)
      //     ? currentValue.push(token)
      //     : [...[currentValue], token];
      //   this.context[this.context.currentName] = newValue;
      // }
    }
  }

  parse() {
    return this.result;
  }
}
