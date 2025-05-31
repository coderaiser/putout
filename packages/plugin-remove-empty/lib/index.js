import * as block from './block/index.js';
import * as staticBlock from './static-block/index.js';
import * as pattern from './pattern/index.js';
import * as nestedPattern from './nested-pattern/index.js';
import * as argument from './argument/index.js';

export const rules = {
    block,
    'static-block': staticBlock,
    pattern,
    'nested-pattern': nestedPattern,
    argument,
};
