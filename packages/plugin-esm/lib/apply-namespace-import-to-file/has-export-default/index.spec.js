import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['has-export-default', plugin],
    ],
});

test('lib: has-export-default: report', (t) => {
    t.report('has-export-default', 'ExportDefaultDeclaration');
    t.end();
});

test('lib: has-export-default: no report: has-no-export-default', (t) => {
    t.noReport('has-no-export-default');
    t.end();
});

test('lib: has-export-default: no transform: has-no-export-default', (t) => {
    t.noTransform('has-export-default');
    t.end();
});
