import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-push-arg', plugin],
    ],
});

test('putout: add-push-arg: report', (t) => {
    t.report('add-push-arg', `Argument 'push' is missing`);
    t.end();
});

test('putout: add-push-arg: transform', (t) => {
    t.transform('add-push-arg');
    t.end();
});
