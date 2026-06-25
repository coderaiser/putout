import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-prepublish-only-to-wisdom', plugin],
    ],
});

test('madrun: convert-prepublish-only-to-wisdom: report', (t) => {
    t.report('convert-prepublish-only-to-wisdom', `Use 'wisdom' instead of 'prepublishOnly'`);
    t.end();
});

test('madrun: convert-prepublish-only-to-wisdom: transform', (t) => {
    t.transform('convert-prepublish-only-to-wisdom');
    t.end();
});
