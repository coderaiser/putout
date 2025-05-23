import {createTest} from '@putout/test';
import * as removeUselessTypesFromConstants from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-types-from-constants', removeUselessTypesFromConstants],
    ],
});

test('plugin-remove-useless-types-from-constants: report: any', (t) => {
    t.report('any', 'Remove useless type when declaring constant with primitive value');
    t.end();
});

test('plugin-remove-useless-types-from-constants: transform: any', (t) => {
    t.transform('any');
    t.end();
});

test('plugin-remove-useless-types-from-constants: transform: let', (t) => {
    t.transform('let');
    t.end();
});

test('plugin-remove-useless-types-from-constants: no transform: union', (t) => {
    t.noTransform('union');
    t.end();
});

test('plugin-remove-useless-types-from-constants: no report: no-type', (t) => {
    t.noReport('no-type');
    t.end();
});
