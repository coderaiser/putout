import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-maintainer-to-label', plugin],
    ],
});

test('docker: convert-maintainer-to-label: report', (t) => {
    t.report('convert-maintainer-to-label', `User 'LABEL' instead of 'MAINTAINER'`);
    t.end();
});

test('docker: convert-maintainer-to-label: transform', (t) => {
    t.transform('convert-maintainer-to-label');
    t.end();
});
