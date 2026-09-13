import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['sort-config', plugin],
    ],
});

test('putout-plugin: putout: sort-readme-file: sort-config: report', (t) => {
    t.report('sort-config', `Sort 'Configuration'`);
    t.end();
});

test('putout-plugin: putout: sort-readme-file: sort-config: transform', (t) => {
    t.transform('sort-config');
    t.end();
});
