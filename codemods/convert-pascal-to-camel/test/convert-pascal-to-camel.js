import {createTest} from '@putout/test';
import * as convert from '../lib/pascal-to-camel.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-pascal-to-camel', convert],
    ],
});

test('plugin-convert-pascal-to-camel: function', (t) => {
    t.transform('function');
    t.end();
});

test('plugin-convert-pascal-to-camel: transform: class', (t) => {
    t.transform('class');
    t.end();
});

test('plugin-convert-pascal-to-camel: class', (t) => {
    t.report('class', `Use camelCase instead of PascalCase in functions HowCome`);
    t.end();
});

test('plugin-convert-pascal-to-camel: jsx', (t) => {
    t.noTransform('jsx');
    t.end();
});

test('plugin-convert-pascal-to-camel: export', (t) => {
    t.transform('export');
    t.end();
});

test('plugin-convert-pascal-to-camel: literal', (t) => {
    t.noTransform('literal');
    t.end();
});
