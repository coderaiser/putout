import process from 'node:process';
import {createTest} from '@putout/test';
import progress from '../lib/progress-bar.js';

const createFreshImport = (count = 0) => (name) => import(`${name}?count=${++count}`);
const freshImport = createFreshImport();

const test = createTest(import.meta.url, {
    'remove-unused-variables': rmVars,
});
