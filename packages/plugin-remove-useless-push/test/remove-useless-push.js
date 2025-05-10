import {createTest} from '@putout/test';
import * as plugin from '../lib/remove-useless-push.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-push', plugin],
    ],
});

test('putout: remove-useless-push: report', (t) => {
    t.report('remove-useless-push', `Avoid useless 'push()' to array `);
    t.end();
});

test('putout: remove-useless-push: transform', (t) => {
    t.transform('remove-useless-push');
    t.end();
});
