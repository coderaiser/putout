import * as convertToArrowFunction from './convert-to-arrow-function/index.js';
import * as convertToComparison from './convert-to-comparison/index.js';
import * as convertToDeclaration from './convert-to-declaration/index.js';
import * as simplify from './simplify/index.js';
import * as split from './split/index.js';

export const rules = {
    'convert-to-arrow-function': convertToArrowFunction,
    'convert-to-comparison': convertToComparison,
    'convert-to-declaration': convertToDeclaration,
    'simplify': simplify,
    'split': split,
};
