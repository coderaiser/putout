'use strict';

const montag = require('montag');
const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['putout/declare', declare],
    ],
});

test('plugin-putout: declare: report', (t) => {
    t.report('compare', `Declare 'compare', it referenced but not defined`);
    t.end();
});

test('plugin-putout: declare: transform: compare', (t) => {
    t.transform('compare');
    t.end();
});

test('plugin-putout: declare: transform: compare: second time', (t) => {
    t.transform('compare');
    t.end();
});

test('plugin-putout: declare: transform: contains', (t) => {
    t.transform('contains');
    t.end();
});

test('plugin-putout: declare: transform: traverse', (t) => {
    t.transform('traverse');
    t.end();
});

test('plugin-putout: declare: transform: operator', (t) => {
    t.transform('operator');
    t.end();
});

test('plugin-putout: declare: transform: types', (t) => {
    t.transform('types');
    t.end();
});

test('plugin-putout: declare: transform: template', (t) => {
    t.transform('template');
    t.end();
});

test('plugin-putout: declare: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-putout: declare: transform: get-template-values', (t) => {
    t.transform('get-template-values');
    t.end();
});

test('plugin-putout: declare: transform: regexp', (t) => {
    t.transform('regexp');
    t.end();
});

test('plugin-putout: declare: transform: add-args', (t) => {
    t.transform('add-args');
    t.end();
});

test('plugin-putout: declare: transform: replaceWith', (t) => {
    t.transformCode('replaceWith(a);', montag`
        import {operator} from 'putout';
        
        const {replaceWith} = operator;
        replaceWith(a);\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: replaceWithMultiple', (t) => {
    t.transformCode('replaceWithMultiple(a);', montag`
        import {operator} from 'putout';
        
        const {replaceWithMultiple} = operator;
        replaceWithMultiple(a);\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: getProperties', (t) => {
    t.transformCode('getProperties(a, []);', montag`
        import {operator} from 'putout';
        
        const {getProperties} = operator;
        getProperties(a, []);\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: isESM', (t) => {
    t.transformCode('isESM', montag`
        import {operator} from 'putout';
        
        const {isESM} = operator;
        isESM;\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: create-test', (t) => {
    t.transform('create-test');
    t.end();
});

test('plugin-putout: declare: transform: properties', (t) => {
    t.transform('properties');
    t.end();
});

test('plugin-putout: declare: transform: remove', (t) => {
    t.transformCode('remove();', montag`
        import {operator} from 'putout';
        
        const {remove} = operator;
        remove();\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: extract', (t) => {
    t.transformCode('extract();', montag`
        import {operator} from 'putout';
        
        const {extract} = operator;
        extract();\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: getPathAfterImports', (t) => {
    t.transformCode('getPathAfterImports();', montag`
        import {operator} from 'putout';
        
        const {getPathAfterImports} = operator;
        getPathAfterImports();\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: compute', (t) => {
    t.transformCode('compute();', montag`
        import {operator} from 'putout';
        
        const {compute} = operator;
        compute();\n
    `);
    t.end();
});
