import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-traverser-to-ignore', plugin],
    ],
});

test('putout: apply-traverser-to-ignore: report', (t) => {
    t.report('apply-traverser-to-ignore', `Use 'Traverser' instead of 'Replacer'`);
    t.end();
});

test('putout: apply-traverser-to-ignore: transform', (t) => {
    t.transform('apply-traverser-to-ignore');
    t.end();
});

test('putout: apply-traverser-to-ignore: transform: no-report', (t) => {
    t.transform('no-report');
    t.end();
});

test('putout: apply-traverser-to-ignore: transform: no-traverse', (t) => {
    t.transform('no-traverse');
    t.end();
});
