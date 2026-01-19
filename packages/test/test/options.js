import * as esm from '@putout/plugin-esm';
import {createTest} from '../lib/test.js';

const test = createTest(import.meta.url, {
    'esm/remove-empty-import': esm.rules['remove-empty-import'],
});

test('test: options', (t) => {
    t.transformWithOptions('transform-options', {
        ignore: ['hello'],
    });
    t.end();
});

test('test: options: no transform', (t) => {
    t.noTransformWithOptions('no-transform-options', {
        ignore: [
            'hello',
            'world',
        ],
    });
    t.end();
});
