import * as applyEarly from './apply-early/index.js';
import * as convertFromContinue from './convert-from-continue/index.js';
import * as convertFromBreak from './convert-from-break/index.js';
import * as mergeWithNextSibling from './merge-with-next-sibling/index.js';
import * as removeUseless from './remove-useless/index.js';
import * as simplifyBoolean from './simplify-boolean/index.js';

export const rules = {
    'apply-early': applyEarly,
    'convert-from-continue': convertFromContinue,
    'convert-from-break': convertFromBreak,
    'merge-with-next-sibling': mergeWithNextSibling,
    'simplify-boolean': simplifyBoolean,
    'remove-useless': removeUseless,
};
