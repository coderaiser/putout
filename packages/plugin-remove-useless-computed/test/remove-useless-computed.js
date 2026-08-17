import {createTest} from '@putout/test';
import * as plugin from '../lib/remove-useless-computed.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-computed', plugin],
    ],
});

test('putout: plugin-remove-useless-computed: report: remove-useless-computed', (t) => {
    t.report('remove-useless-computed', `Avoid useless 'computed'`);
    t.end();
});

test('putout: plugin-remove-useless-computed: transform: remove-useless-computed', (t) => {
    t.transform('remove-useless-computed');
    t.end();
});
