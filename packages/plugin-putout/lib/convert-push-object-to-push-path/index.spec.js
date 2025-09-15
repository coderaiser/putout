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

test('putout: convert-push-object-to-push-path: no report: multiple-push', (t) => {
    t.noReport('multiple-push');
    t.end();
});

test('putout: convert-push-object-to-push-path: no report: multiple-fix', (t) => {
    t.noReport('multiple-fix');
    t.end();
});

test('putout: convert-push-object-to-push-path: transform: no-rename', (t) => {
    t.transform('no-rename');
    t.end();
});
