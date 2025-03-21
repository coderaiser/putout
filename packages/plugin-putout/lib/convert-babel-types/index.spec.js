import {createTest} from '@putout/test';
import * as convertBabelTypes from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/convert-babel-types', convertBabelTypes],
    ],
});

test('plugin-putout: convert-babel-types: report: types', (t) => {
    t.report('types', '"putout.types" should be used instead of "@babel/types"');
    t.end();
});

test('plugin-putout: convert-babel-types: transform: types', (t) => {
    t.transform('types');
    t.end();
});

test('plugin-putout: convert-babel-types: no transform: no-types', (t) => {
    t.noTransform('no-types');
    t.end();
});
