import {createTest} from '@putout/test';
import * as convertToNoTransformCode from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/convert-to-no-transform-code', convertToNoTransformCode],
    ],
});

test('plugin-putout: convert-to-no-transform-code: transform: no-transform-code', (t) => {
    t.transform('no-transform-code');
    t.end();
});

test('plugin-putout: convert-to-no-no transform-code: no transform: not-same', (t) => {
    t.noTransform('not-same');
    t.end();
});

test('plugin-putout: convert-to-no-transform-code: no transform: literal', (t) => {
    t.noTransform('literal');
    t.end();
});
