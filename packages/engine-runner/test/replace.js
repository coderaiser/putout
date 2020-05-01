'use strict';

const test = require('supertape');
const putout = require('putout');

const {runPlugins} = require('..');

test('putout: runner: replace: same', (t) => {
    const addVar = {
        report: () => '',
        replace: () => ({
            'test(__a, (__args) => {})': 'test(__a, (__args) => {})',
        }),
    };
    
    const {code} = putout(`test('', (t) => {})`, {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = `test('', t => {});`;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: replace: same path, new transform', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            'module.exports.__a = __b': 'export const __a = __b',
        }),
    };
    
    const source = [
        'module.exports.set = () => {',
        '};',
        '',
        'module.exports.get = () => {',
        '}',
    ].join('\n');
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['convert', convert],
        ],
    });
    
    const expected = [
        'export const set = () => {',
        '};',
        '',
        'export const get = () => {',
        '};',
    ].join('\n');
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

