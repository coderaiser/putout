import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-printer-option', plugin],
    ],
});

test('putout: remove-useless-printer-option: report', (t) => {
    t.report('remove-useless-printer-option', `Avoid useless 'printer' option`);
    t.end();
});

test('putout: remove-useless-printer-option: transform', (t) => {
    t.transform('remove-useless-printer-option');
    t.end();
});

test('putout: remove-useless-printer-option: no-report: no-create-test', (t) => {
    t.noReport('no-create-test');
    t.end();
});
