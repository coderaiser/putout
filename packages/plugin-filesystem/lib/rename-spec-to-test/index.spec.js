import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['rename-spec-to-test', plugin],
    ],
});

test('packages: rename-spec-to-test: report', (t) => {
    t.report('rename-spec-to-test', `Rename '*.spec.*' to '*.test.*'`);
    t.end();
});

test('packages: rename-spec-to-test: transform', (t) => {
    t.transform('rename-spec-to-test');
    t.end();
});
