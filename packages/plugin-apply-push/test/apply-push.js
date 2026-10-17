import {createTest} from '@putout/test';
import * as plugin from '../lib/apply-push.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-push', plugin],
    ],
});

test('putout: apply-push: report', (t) => {
    t.report('apply-push', `Use binded 'push'`);
    t.end();
});

test('putout: apply-push: transform', (t) => {
    t.transform('apply-push');
    t.end();
});

test('putout: apply-push: transform: no-declaration', (t) => {
    t.transform('no-declaration');
    t.end();
});

test('putout: apply-push: transform: declared', (t) => {
    t.transform('declared');
    t.end();
});
