import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-io-delete-to-io-remove', plugin],
    ],
});

test('cloudcmd: convert-io-delete-to-io-remove: report', (t) => {
    t.report('convert-io-delete-to-io-remove', `Use 'IO.remove' instead of 'IO.delete'`);
    t.end();
});

test('cloudcmd: convert-io-delete-to-io-remove: transform', (t) => {
    t.transform('convert-io-delete-to-io-remove');
    t.end();
});
