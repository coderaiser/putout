import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-madrun-init', plugin],
    ],
});

test('github: add-madrun-init: report', (t) => {
    t.report('add-madrun-init', `Add 'madrun init'`);
    t.end();
});

test('github: add-madrun-init: transform', (t) => {
    t.transform('add-madrun-init');
    t.end();
});
