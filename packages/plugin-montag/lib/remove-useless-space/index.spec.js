import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-space', plugin],
    ],
});

test('montag: remove-useless-space: report', (t) => {
    t.report('remove-useless-space', `Avoid useless space: 'montag\` ' -> 'montag\`'`);
    t.end();
});

test('montag: remove-useless-space: transform', (t) => {
    t.transform('remove-useless-space');
    t.end();
});
