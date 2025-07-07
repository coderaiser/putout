import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-exports', plugin],
    ],
});

test('putout: apply-exports: report', (t) => {
    t.reportWithOptions('apply-exports', `Apply exports to 'createRenameProperty()'`, {
        createRenameProperty: [
            'report',
            'fix',
            'scan',
        ],
    });
    t.end();
});

test('putout: apply-exports: transform with options', (t) => {
    t.transformWithOptions('apply-exports', {
        createRenameProperty: [
            'report',
            'fix',
            'scan',
        ],
    });
    t.end();
});
