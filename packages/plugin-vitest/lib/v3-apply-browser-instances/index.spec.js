import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['v3-apply-browser-instances', plugin],
    ],
});

test('vitest: v3-apply-browser-instances: report', (t) => {
    t.report('v3-apply-browser-instances', `Use 'browser.instances'`);
    t.end();
});

test('vitest: v3-apply-browser-instances: transform', (t) => {
    t.transform('v3-apply-browser-instances');
    t.end();
});

test('vitest: v3-apply-browser-instances: no report after transform', (t) => {
    t.noReportAfterTransform('v3-apply-browser-instances');
    t.end();
});
