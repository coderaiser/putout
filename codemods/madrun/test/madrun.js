import {createTest} from '@putout/test';
import * as codemodMadrun from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['codemod-madrun', codemodMadrun],
    ],
});

test('codemod-madrun: transform', (t) => {
    t.transform('add-madrun-to-lint');
    t.end();
});

test('codemod-madrun: no transform: no module.exports', (t) => {
    t.noTransform('no-module-exports');
    t.end();
});

test('codemod-madrun: no transform: module.exports not object', (t) => {
    t.noTransform('module-exports-not-object');
    t.end();
});
