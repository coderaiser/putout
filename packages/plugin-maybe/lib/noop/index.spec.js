import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['maybe/noop', convert],
    ],
});

test('plugin-maybe: noop: report', (t) => {
    t.report('noop', `Use 'noop()'`);
    t.end();
});

test('plugin-maybe: noop: transform', (t) => {
    t.transform('noop');
    t.end();
});

test('plugin-maybe: noop: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});

test('plugin-maybe: noop: no transform: declaration', (t) => {
    t.noTransform('declaration');
    t.end();
});
