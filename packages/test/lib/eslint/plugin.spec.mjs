import {createTest} from './eslint.mjs';
import {createPlugin} from '@putout/eslint/create-plugin';

const test = createTest(import.meta.url, [
    ['remove-debugger', createPlugin(await import('./fixture/remove-debugger.js'))],
]);

test('test: eslint: report', (t) => {
    t.report('report', `Avoid 'debugger' statement`);
    t.end();
});

test('test: eslint: report: array', (t) => {
    t.report('report', [`Avoid 'debugger' statement`]);
    t.end();
});

test('test: eslint: transform', (t) => {
    t.transform('transform');
    t.end();
});

