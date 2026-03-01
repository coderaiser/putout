import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-dot-slash-from-bin', plugin],
    ],
});

test('package-json: remove-dot-slash-from-bin: report', (t) => {
    t.report('remove-dot-slash-from-bin', `Avoid './' in 'bin': './bin/c8.js' -> 'bin/c8.js'`);
    t.end();
});

test('package-json: remove-dot-slash-from-bin: transform', (t) => {
    t.transform('remove-dot-slash-from-bin');
    t.end();
});
