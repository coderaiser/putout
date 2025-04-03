import * as applyExponentiation from './apply-exponentiation/index.js';
import * as applyMultiplication from './apply-multiplication/index.js';
import * as applyNumericSeparators from './apply-numeric-separators/index.js';
import * as convertSqrtToHypot from './convert-sqrt-to-hypot/index.js';
import * as declare from './declare/index.js';
import * as removeUnchangedZeroDeclarations from './remove-unchanged-zero-declarations/index.js';

export const rules = {
    'apply-exponentiation': applyExponentiation,
    'apply-multiplication': applyMultiplication,
    'apply-numeric-separators': applyNumericSeparators,
    'convert-sqrt-to-hypot': convertSqrtToHypot,
    declare,
    'remove-unchanged-zero-declarations': removeUnchangedZeroDeclarations,
};
