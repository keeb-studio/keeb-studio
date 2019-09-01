export default class KicadPCB {
  static funtionalParse(content: string) {
    const remainingTokens: Array<string> = flatMap(
      content.split(/\r?\n/),
      (line: string) => {
        line = line.replace(/#.*$/, "");
        return line.split(/([()]|"(?:\\"|[^"])*")|\s+/).filter(t => !!t);
      }
    ).filter(t => t.length > 0);

    const { context } = this.functionParseToken({
      token: remainingTokens.shift() || "",
      remainingTokens,
      context: {},
      lastState: "",
      lastProperty: "",
      parentContext: null,
      parentContextProperty: "",
      parenCount: 1
    });

    return context;
  }

  public static functionParseToken(params: ParseContext): any {
    let {
      token,
      remainingTokens,
      context,
      lastState,
      lastProperty,
      parentContext,
      parentContextProperty,
      parenCount
    } = params;
    const newState = getNewState(lastState, token);
    // console.log(token, newState, params);
    if (remainingTokens.length === 0) {
      return {
        token: remainingTokens.shift() || "",
        remainingTokens: remainingTokens || [],
        context,
        lastState: newState,
        lastProperty,
        parentContext,
        parentContextProperty
      };
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
      parentContext[parentContextProperty] = context;

      return {
        token: remainingTokens.shift() || "",
        remainingTokens,
        context: { ...parentContext },
        lastState: newState,
        lastProperty: parentContextProperty,
        parentContext: null,
        parentContextProperty: ""
      };
    }

    return this.functionParseToken({
      token: remainingTokens.shift() || "",
      remainingTokens: remainingTokens || [],
      context: context || {},
      lastState: newState,
      lastProperty,
      parentContext,
      parentContextProperty,
      parenCount
    });
  }

  public static addToken(tokenContext: TokenContext): TokenContext {
    let tokens = [...tokenContext.tokens];
    const token = tokens.shift() || "";
    const action = getNewState(tokenContext.action, token);
    let context = { ...tokenContext.context } as any;

    let open = tokenContext.open;
    if (action === NEW_CONTEXT) {
      open++;
    } else if (action === CLOSE_CONTEXT) {
      open--;
    }

    let property = tokenContext.property;

    // console.log(action);
    // console.log(action, tokenContext);
    if (action === NEW_CONTEXT) {
      const reuseContext = tokenContext.context[tokenContext.property];
      // console.log(NEW_CONTEXT, tokenContext, reuseContext ? true : false);
      if (reuseContext) {
        context = tokenContext.context[tokenContext.property];
      }
    }
    if (action === ADD_PROPERTY) {
      property = token;
      //look at next token?
      const { context: child_context, tokens: child_tokens } = this.addToken({
        tokens,
        action,
        context,
        property,
        open: 0
      });
      const { contextValue } = child_context;

      context[token] = contextValue || child_context;
      console.log("add prop", token, context[token]);
      tokens = child_tokens;
    } else if (action === SET_PROPERTY) {
      // console.log("set", context, property);
      // we have to recurse if next token is (
      return this.addToken({
        tokens,
        action,
        context: { contextValue: token },
        property,
        open
      });
    } else if (action === CLOSE_CONTEXT) {
      // console.log("close", open);
    }

    const newTokenContext = {
      tokens,
      action,
      context,
      property,
      open
    };

    // if (tokens[0] === ")") console.log("nextToken", tokens[0] === ")", open);
    if (open === 0) {
      return newTokenContext;
    } else {
      return this.addToken(newTokenContext);
    }
  }
}

export const NEW_CONTEXT = "NEW_CONTEXT";
export const ADD_PROPERTY = "ADD_PROPERTY";
export const SET_PROPERTY = "SET_PROPERTY";
export const PUSH_PROPERTY = "PUSH_PROPERTY";
export const CLOSE_CONTEXT = "CLOSE_CONTEXT";
export const START = "START";

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
  parenCount: number;
}

interface TokenContext {
  tokens: Array<string>;
  context: any;
  action: string;
  property: string;
  open: number;
}

export function getDefaultParseContext(): ParseContext {
  return {
    token: "",
    remainingTokens: [],
    context: {},
    lastState: "",
    lastProperty: "",
    parentContext: null,
    parentContextProperty: "",
    parenCount: 0
  };
}

function flatMap<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U[]
): U[] {
  return Array.prototype.concat(...array.map(callbackfn));
}
