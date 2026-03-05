import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-maybe', plugin],
    ],
});

test('printer: remove-useless-maybe: report', (t) => {
    t.report('remove-useless-maybe', `Avoid useless 'maybe'`);
    t.end();
});

test('printer: remove-useless-maybe: transform', (t) => {
    t.transform('remove-useless-maybe');
    t.end();
});

test('printer: remove-useless-maybe: transform: indent', (t) => {
    t.transform('indent');
    t.end();
});
