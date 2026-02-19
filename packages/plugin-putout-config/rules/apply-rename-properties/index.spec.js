import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-rename-properties', plugin],
    ],
});

test('putout-config: apply-rename-properties: report', (t) => {
    t.report('apply-rename-properties', `Use 'createRenameProperties()' instead of 'createRenameProperty()'`);
    t.end();
});

test('putout-config: apply-rename-properties: transform', (t) => {
    t.transform('apply-rename-properties');
    t.end();
});
