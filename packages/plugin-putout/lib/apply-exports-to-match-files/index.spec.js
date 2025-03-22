import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-exports-to-match-files', plugin],
    ],
});

test('putout: apply-exports-to-match-files: report', (t) => {
    t.report('apply-exports-to-match-files', `Apply 'exports' to 'matchFiles()'`);
    t.end();
});

test('putout: apply-exports-to-match-files: transform', (t) => {
    t.transform('apply-exports-to-match-files');
    t.end();
});
