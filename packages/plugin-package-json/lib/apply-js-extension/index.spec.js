import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-js-extension', plugin],
    ],
});

test('package-json: apply-js-extension: report', (t) => {
    t.report('apply-js-extension', `Use '.js' instead of '.mjs' in './lib/putout.mjs'`);
    t.end();
});

test('package-json: apply-js-extension: transform', (t) => {
    t.transform('apply-js-extension');
    t.end();
});
