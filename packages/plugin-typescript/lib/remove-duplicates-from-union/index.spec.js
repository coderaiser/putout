import {operator} from 'putout';
import {createTest} from '@putout/test';
import * as removeDuplicatesFromUnion from './index.js';

const noop = () => {};
const {remove} = operator;

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-duplicates-from-union', removeDuplicatesFromUnion],
    ],
});

test('plugin-remove-duplicates-from-union: report: union', (t) => {
    t.report('union', 'Avoid using duplicates in Union');
    t.end();
});

test('plugin-remove-duplicates-from-union: transform: union', (t) => {
    t.transform('union');
    t.end();
});

test('plugin-remove-duplicates-from-union: report: object', (t) => {
    t.report('object', ['Avoid using duplicates in Union']);
    t.end();
});

test('plugin-remove-duplicates-from-union: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-remove-duplicates-from-union: transform: remove', (t) => {
    t.transform('remove', {
        remove: {
            report: noop,
            include: () => ['TSTypeLiteral'],
            fix: (path) => remove(path),
        },
    });
    t.end();
});
