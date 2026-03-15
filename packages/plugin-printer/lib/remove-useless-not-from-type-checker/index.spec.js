import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-not-from-type-checker', plugin],
    ],
});

test('printer: remove-useless-not-from-type-checker: report', (t) => {
    t.report('remove-useless-not-from-type-checker', `Avoid useless '!': '-: -> !+' -> '-: -> -'`);
    t.end();
});

test('printer: remove-useless-not-from-type-checker: transform', (t) => {
    t.transform('remove-useless-not-from-type-checker');
    t.end();
});
