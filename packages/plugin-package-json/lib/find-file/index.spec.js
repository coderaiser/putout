import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['find-file', plugin],
    ],
});

test('putout: plugin-package-json: find-file: report', (t) => {
    t.report('find-file', `Add 'type' of module to 'package.json'`);
    t.end();
});

test('putout: plugin-package-json: find-file: transform', (t) => {
    t.transform('find-file');
    t.end();
});
