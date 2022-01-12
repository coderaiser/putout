'use strict';

const montag = require('montag');

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    'putout/declare': declare,
});

test('plugin-putout: declare: report', (t) => {
    t.report('compare', `Declare 'compare'`);
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

test('plugin-putout: declare: transform: add-argument', (t) => {
    t.transform('add-argument');
    t.end();
});

test('plugin-putout: declare: transform: replaceWith', (t) => {
    t.transformCode('replaceWith(a);', montag`
        import {operator} from 'putout';
        
        const {
          replaceWith
        } = operator;
        
        replaceWith(a);
    `);
    t.end();
});

test('plugin-putout: declare: transform: replaceWithMultiple', (t) => {
    t.transformCode('replaceWithMultiple(a);', montag`
        import {operator} from 'putout';
        
        const {
          replaceWithMultiple
        } = operator;
        
        replaceWithMultiple(a);
    `);
    t.end();
});

test('plugin-putout: declare: transform: getProperties', (t) => {
    t.transformCode('getProperties(a, []);', montag`
        import {operator} from 'putout';
        
        const {
          getProperties
        } = operator;
        
        getProperties(a, []);
    `);
    t.end();
});

test('plugin-putout: declare: transform: isESM', (t) => {
    t.transformCode('isESM', montag`
        import {operator} from 'putout';
        
        const {
          isESM
        } = operator;
        
        isESM
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

