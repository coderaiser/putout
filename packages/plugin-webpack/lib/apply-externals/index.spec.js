import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['webpack/apply-externals', plugin],
    ],
});

test('plugin-webpack: apply-externals: report', (t) => {
    t.report('apply-externals', `Use 'externals({context, request}, callback){...}'`);
    t.end();
});

test('plugin-webpack: apply-externals: transform', (t) => {
    t.transform('apply-externals');
    t.end();
});

test('plugin-webpack: apply-externals: no transform: two-args', (t) => {
    t.noTransform('two-args');
    t.end();
});
