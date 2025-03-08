import {defineConfig} from 'eslint/config';
import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';

export default defineConfig([safeAlign, matchToFlat(match)]);
