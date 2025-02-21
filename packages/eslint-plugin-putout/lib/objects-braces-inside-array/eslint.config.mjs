import {safeAlign} from 'eslint-plugin-putout';
import {
    createESLintConfig,
    matchToFlat,
} from '@putout/eslint-flat';

export const match = {
    '*.spec.js': {
        'putout/objects-braces-inside-array': 'off',
    },
};
export default createESLintConfig([safeAlign, matchToFlat(match)]);
