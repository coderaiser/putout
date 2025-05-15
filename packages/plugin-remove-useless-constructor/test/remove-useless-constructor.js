import {createTest} from '@putout/test';
import * as removeUselessConstructor from '../lib/remove-useless-constructor.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-constructor', removeUselessConstructor],
    ],
});

test('plugin-remove-useless-constructor: report: constructor', (t) => {
    t.report('constructor', 'Avoid useless constructor');
    t.end();
});

test('plugin-remove-useless-constructor: transform: constructor', (t) => {
    t.transform('constructor');
    t.end();
});

test('plugin-remove-useless-constructor: no report: not-constructor', (t) => {
    t.noReport('not-constructor');
    t.end();
});
