import {safeAlign} from 'eslint-plugin-putout/config';

export let match;
export default createESLintConfig([safeAlign, matchToFlat(match)]);