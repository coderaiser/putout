'use strict';

const progress = require('..');
const {reRequire} = require('mock-require');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

test('formatter: memory', (t) => {
    t.format(progress, 'var');
    t.end();
});

test('formatter: memory: no', (t) => {
    t.format(progress, 'no');
    t.end();
});

test('formatter: memory: many', (t) => {
    t.formatMany(progress, ['var', 'var']);
    t.end();
});

test('formatter: memory: minCount', (t) => {
    t.format(progress, 'min-count', {
        minCount: 10,
    });
    
    t.end();
});

test('formatter: memory: color', (t) => {
    const progress = reRequire('..');
    t.format(progress, 'color', {
        color: 'red',
    });
    
    t.end();
});

test('formatter: memory: get stream: no progress bar', (t) => {
    const {PUTOUT_NO_PROGRESS_BAR} = process.env;
    
    process.env.PUTOUT_NO_PROGRESS_BAR = 1;
    const {_getStream} = reRequire('..');
    const stream = _getStream();
    const {stderr} = process;
    
    process.env.PUTOUT_NO_PROGRESS_BAR = PUTOUT_NO_PROGRESS_BAR;
    
    t.notEqual(stream, stderr, 'should equal to stderr');
    t.end();
});

test('formatter: memory: get stream', (t) => {
    const {PUTOUT_NO_PROGRESS_BAR} = process.env;
    delete process.env.PUTOUT_NO_PROGRESS_BAR;
    
    const {_getStream} = reRequire('..');
    const stream = _getStream();
    
    const {stderr} = process;
    process.env.PUTOUT_NO_PROGRESS_BAR = PUTOUT_NO_PROGRESS_BAR;
    
    t.ok(stream === stderr, 'should equal to stderr');
    t.end();
});

