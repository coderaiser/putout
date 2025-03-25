import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['madrun/convert-cut-env-to-run', convert],
    ],
});

test('madrun: convert-cut-env-to-run: report: cut-env', (t) => {
    t.report('cut-env', `Use 'run()' instead of 'cutEnv()'`);
    t.end();
});

test('madrun: convert-cut-env-to-run: transform: cut-env', (t) => {
    t.transform('cut-env');
    t.end();
});

test('madrun: convert-cut-env-to-run: no transform: no export default', (t) => {
    t.noTransformCode(`export const hello = 'world';\ncutEnv('hello');\n`);
    t.end();
});

test('madrun: convert-cut-env-to-run: no transform: no-property', (t) => {
    t.noTransform('no-property');
    t.end();
});
