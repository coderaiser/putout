'use strict';

const convert = require('..');
const test = require('@putout/test')(__dirname, {
    'convert-pascal-to-camel': convert,
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
    t.report('class', `Should be used camelCase instead of PascalCase in functions HowCome`);
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

