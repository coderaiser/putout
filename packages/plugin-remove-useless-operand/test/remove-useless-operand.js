import {createTest} from '@putout/test';
import * as removeUselessOperand from '../lib/remove-useless-operand.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-operand', removeUselessOperand],
    ],
});

test('plugin-remove-useless-operand: report: operand', (t) => {
    t.report('operand', 'Avoid useless operand');
    t.end();
});

test('plugin-remove-useless-operand: transform: operand', (t) => {
    t.transform('operand');
    t.end();
});

test('plugin-remove-useless-operand: transform: add-one', (t) => {
    t.transform('add-one');
    t.end();
});

test('plugin-remove-useless-operand: transform: sub-one', (t) => {
    t.transform('sub-one');
    t.end();
});

test('plugin-remove-useless-operand: transform: right', (t) => {
    t.transform('right');
    t.end();
});

test('plugin-remove-useless-operand: transform: number', (t) => {
    t.transform('number');
    t.end();
});

test('plugin-remove-useless-operand: transform: declaration', (t) => {
    t.transform('declaration');
    t.end();
});
