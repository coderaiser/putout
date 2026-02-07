import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-message-from-no-report-after-transform', plugin],
    ],
});

test('putout: remove-message-from-no-report-after-transform: report', (t) => {
    t.report('remove-message-from-no-report-after-transform', `Avoid 'message' in 't.noReportAfterTransform()'`);
    t.end();
});

test('putout: remove-message-from-no-report-after-transform: transform', (t) => {
    t.transform('remove-message-from-no-report-after-transform');
    t.end();
});
