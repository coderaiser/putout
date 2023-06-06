'use strict';

const {createTest} = require('@putout/test');

const convert = require('..');

const test = createTest(__dirname, {
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
