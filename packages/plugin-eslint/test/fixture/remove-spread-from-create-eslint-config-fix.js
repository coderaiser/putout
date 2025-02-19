import {createESLintConfig} from '@putout/eslint-flat';
import {safeAlign} from 'eslint-plugin-putout/config';
import {matchToFlat} from '@putout/eslint-flat';

export default createESLintConfig([safeAlign, matchToFlat(match)]);
