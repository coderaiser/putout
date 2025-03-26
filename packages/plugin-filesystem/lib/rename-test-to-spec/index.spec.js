import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['rename-test-to-spec', plugin],
    ],
});

test('packages: rename-test-to-spec: report', (t) => {
    t.report('rename-test-to-spec', `Rename '*.test.*' to '*.spec.*'`);
    t.end();
});

test('packages: rename-test-to-spec: transform', (t) => {
    t.transform('rename-test-to-spec');
    t.end();
});
