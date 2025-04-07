import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-provider', plugin],
    ],
});

test('react: remove-useless-provider: report', (t) => {
    t.report('remove-useless-provider', `Remove useless 'Provider': 'UseTheme.Provider' -> 'UseTheme'`);
    t.end();
});

test('react: remove-useless-provider: transform', (t) => {
    t.transform('remove-useless-provider');
    t.end();
});
