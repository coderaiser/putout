import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/convert-number-to-numeric', plugin],
    ],
});

test('plugin-putout: convert-number-to-numeric: report', (t) => {
    t.report('convert-number-to-numeric', `Use 'isNumericLiteral()' instead of 'isNumberLiteral()'`);
    t.end();
});

test('plugin-putout: convert-number-to-numeric: transform', (t) => {
    t.transform('convert-number-to-numeric');
    t.end();
});

test('plugin-putout: convert-number-to-numeric: transform: twice', (t) => {
    t.transform('twice');
    t.end();
});

test('plugin-putout: convert-number-to-numeric: transform: create-node', (t) => {
    t.transform('create-node');
    t.end();
});
