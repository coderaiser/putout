import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-import-attributes', plugin],
    ],
});

test('esm: apply-import-attributes: report', (t) => {
    t.report('apply-import-attributes', `Use \`import with {type: 'json'}\``);
    t.end();
});

test('esm: apply-import-attributes: transform', (t) => {
    t.transform('apply-import-attributes');
    t.end();
});

test('esm: apply-import-attributes: report: export', (t) => {
    t.report('export', `Use \`export with {type: 'json'}\``);
    t.end();
});

test('esm: apply-import-attributes: report: dynamic', (t) => {
    t.report('dynamic', `Use \`import with {type: 'json'}\``);
    t.end();
});

test('esm: apply-import-attributes: transform: dynamic', (t) => {
    t.transform('dynamic');
    t.end();
});

test('esm: apply-import-attributes: transform: export-all', (t) => {
    t.transform('export-all');
    t.end();
});
