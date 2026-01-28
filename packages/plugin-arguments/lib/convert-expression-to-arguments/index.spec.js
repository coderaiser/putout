import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['arguments/convert-expression-to-arguments', plugin],
    ],
});

test('putout: arguments: convert-expression-to-arguments: report', (t) => {
    t.report('convert-expression-to-arguments', `Use arguments instead of expression`);
    t.end();
});

test('putout: arguments: convert-expression-to-arguments: transform', (t) => {
    t.transform('convert-expression-to-arguments');
    t.end();
});

test('putout: arguments: convert-expression-to-arguments: no report: no-args', (t) => {
    t.noReport('no-args');
    t.end();
});
