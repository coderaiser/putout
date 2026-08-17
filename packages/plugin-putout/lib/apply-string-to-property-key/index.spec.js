import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-string-to-property-key', plugin],
    ],
});

test('putout: apply-string-to-property-key: report', (t) => {
    t.report('apply-string-to-property-key', `Use 'string' instead of 'template' in property key`);
    t.end();
});

test('putout: apply-string-to-property-key: transform', (t) => {
    t.transform('apply-string-to-property-key');
    t.end();
});
