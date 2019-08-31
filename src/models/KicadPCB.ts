export default class KicadPCB {
  static funtionalParse(content: string) {
    const remainingTokens: Array<string> = flatMap(
      content.split(/\r?\n/),
      (line: string) => {
        line = line.replace(/#.*$/, "");
        return line.split(/([()]|"(?:\\"|[^"])*")|\s+/).filter(t => !!t);
      }
    ).filter(t => t.length > 0);

    return this.functionParseToken({
      token: remainingTokens.shift() || "",
      remainingTokens,
      context: {},
      lastState: "",
      lastProperty: "",
      parentContext: null,
      parentContextProperty: ""
    });
  }

  static functionParseToken({
    token,
    remainingTokens,
    context,
    lastState,
    lastProperty,
    parentContext,
    parentContextProperty
  }: ParseContext): any {
    const newState = getNewState(lastState, token);
    console.log(token, remainingTokens);
    if (remainingTokens.length === 0) {
      return context;
    }

    if (newState === ADD_PROPERTY) {
      context[token] = {};
      lastProperty = token;
    }

    if (newState === NEW_CONTEXT) {
      context = context[lastProperty];
      parentContextProperty = lastProperty;
      lastProperty = "";
      parentContext = { ...context };
    }

    if (newState === SET_PROPERTY) {
      context[lastProperty] = token;
    }

    if (newState === CLOSE_CONTEXT) {
      // todo
      parentContext[parentContextProperty] = context;
      return { ...parentContext };
    }

    return this.functionParseToken({
      token: remainingTokens.shift() || "",
      remainingTokens,
      context: context || {},
      lastState: newState,
      lastProperty,
      parentContext,
      parentContextProperty
    });
  }
}

const NEW_CONTEXT = "NEW_CONTEXT";
const ADD_PROPERTY = "ADD_PROPERTY";
const SET_PROPERTY = "SET_PROPERTY";
const PUSH_PROPERTY = "PUSH_PROPERTY";
const CLOSE_CONTEXT = "CLOSE_CONTEXT";

function getNewState(state: string, token: string): string {
  if (token === "(") {
    return NEW_CONTEXT;
  } else if (token === ")") {
    return CLOSE_CONTEXT;
  } else if (state === ADD_PROPERTY) {
    return SET_PROPERTY;
  } else if (state === SET_PROPERTY) {
    return PUSH_PROPERTY;
  } else {
    return ADD_PROPERTY;
  }
}
interface ParseContext {
  token: string;
  remainingTokens: Array<string>;
  context: any;
  lastState: string;
  lastProperty: string;
  parentContext: any;
  parentContextProperty: string;
}

function flatMap<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U[]
): U[] {
  return Array.prototype.concat(...array.map(callbackfn));
}
