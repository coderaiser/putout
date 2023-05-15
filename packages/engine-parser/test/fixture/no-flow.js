const a = 5;

// @flow

import type { SourceType } from "./options";
import * as N from "../types";

const t = 'hello';

export type Program = NodeBase & {
  sourceType: SourceType,
};

export default class State {
  tokens: Array<N.Comment> = [];
}

export interface IInputHandlingTerminal {
}

