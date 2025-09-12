import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-push-object-to-push-path', plugin],
    ],
});

test('putout: convert-push-object-to-push-path: report', (t) => {
    t.report('convert-push-object-to-push-path', `Use 'push(__a)' instead of 'push({path: __a})'`);
    t.end();
});

test('putout: convert-push-object-to-push-path: transform', (t) => {
    t.transform('convert-push-object-to-push-path');
    t.end();
});

test('putout: convert-push-object-to-push-path: no report: multiple', (t) => {
    t.noReport('multiple');
    t.end();
});
