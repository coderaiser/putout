'use strict';

const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'convert-commonjs-to-esm/require': convert,
});

test('plugin-convert-commonjs-to-esm: require: transform: report', (t) => {
    t.report('require', 'ESM should be used insted of Commonjs');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform', (t) => {
    t.transform('require');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: destructuring', (t) => {
    t.transform('destructuring');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: comment', (t) => {
    t.transform('comment');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: relative', (t) => {
    t.transform('relative');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: json', (t) => {
    // template.ast do not provide assertions field
    // remove when support will appeer
    //
    // https://github.com/babel/babel/issues/12262
    
    // t.transform('json');
    t.transform('json', `import info from './package.json';\n`);
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: no require', (t) => {
    t.noTransform('no-require');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: no call', (t) => {
    t.noTransform('no-call');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: no transform: not literal argument', (t) => {
    t.noTransform('not-literal-argument');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: no report: not literal argument', (t) => {
    t.noReport('not-literal-argument');
    t.end();
});
