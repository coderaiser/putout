import {createTest} from '@putout/test';
import * as removeUselessArrayConstructor from '../lib/remove-useless-array-constructor.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-array-constructor', removeUselessArrayConstructor],
    ],
});

test('plugin-remove-useless-array-constructor: report: array', (t) => {
    t.report('array', `Avoid array constructor, use '[]' instead`);
    t.end();
});

test('plugin-remove-useless-array-constructor: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-remove-useless-array-constructor: transform: of', (t) => {
    t.transform('of');
    t.end();
});
