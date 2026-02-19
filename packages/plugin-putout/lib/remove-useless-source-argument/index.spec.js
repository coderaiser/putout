import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-source-argument', plugin],
    ],
});

test('putout: remove-useless-source-argument: report', (t) => {
    t.report('remove-useless-source-argument', `Avoid useless 'source' argument`);
    t.end();
});

test('putout: remove-useless-source-argument: transform', (t) => {
    t.transform('remove-useless-source-argument');
    t.end();
});
