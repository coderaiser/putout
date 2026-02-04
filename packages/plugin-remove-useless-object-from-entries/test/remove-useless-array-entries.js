import {createTest} from '@putout/test';
import * as removeUselessObjectFromEntries from '../lib/remove-useless-object-from-entries.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-object-from-entries', removeUselessObjectFromEntries],
    ],
});

test('plugin-remove-useless-object-from-entries: report: remove-useless-object-from-entries', (t) => {
    t.report('remove-useless-object-from-entries', `Avoid useless 'fromEntries |> entries'`);
    t.end();
});

test('plugin-remove-useless-object-from-entries: transform: remove-useless-object-from-entries', (t) => {
    t.transform('remove-useless-object-from-entries');
    t.end();
});
