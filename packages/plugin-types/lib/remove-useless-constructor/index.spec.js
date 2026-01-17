import {createTest} from '@putout/test';
import * as removeUselessConstructor from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['types/remove-useless-constructor', removeUselessConstructor],
    ],
});

test('plugin-types: remove-useless-constructor: report: constructor', (t) => {
    t.report('constructor', 'Avoid useless constructor');
    t.end();
});

test('plugin-types: remove-useless-constructor: transform: constructor', (t) => {
    t.transform('constructor');
    t.end();
});

test('plugin-types: remove-useless-constructor: transform: starts-with', (t) => {
    t.transform('starts-with');
    t.end();
});

test('plugin-types: remove-useless-constructor: no transform: not-string', (t) => {
    t.noTransform('not-string');
    t.end();
});
