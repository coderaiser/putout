// @flow

import type { SourceType } from "./options";

export type Program = NodeBase & {
  sourceType: SourceType,
};

