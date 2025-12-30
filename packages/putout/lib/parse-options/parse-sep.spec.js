'use strict';

const process = require('node:process');
const test = require('supertape');
const parseSep = require('./parse-sep');

const {defineProperty} = Object;

test('putout: parse-sep: win32', (t) => {
    const {platform} = process;
    
    defineProperty(process, 'platform', {
        value: 'win32',
    });
    
    const result = parseSep('/hello/');
    const expected = '\\\\hello\\\\';
    
    defineProperty(process, 'platform', {
        value: platform,
    });
    
    t.equal(result, expected);
    t.end();
});

test('putout: parse-sep: linux', (t) => {
    const {platform} = process;
    
    defineProperty(process, 'platform', {
        value: 'linux',
    });
    
    const result = parseSep('/hello');
    const expected = '/hello';
    
    defineProperty(process, 'platform', {
        value: platform,
    });
    
    t.equal(result, expected);
    t.end();
});

test('putout: parse-sep: complex path: *', (t) => {
    const {platform} = process;
    
    defineProperty(process, 'platform', {
        value: 'linux',
    });
    
    const result = parseSep('/hello/*/*/world');
    const expected = '/hello/.*/.*/world';
    
    defineProperty(process, 'platform', {
        value: platform,
    });
    
    t.equal(result, expected);
    t.end();
});

test('putout: parse-sep: complex path: ?', (t) => {
    const {platform} = process;
    
    defineProperty(process, 'platform', {
        value: 'linux',
    });
    
    const result = parseSep('/h?ll?');
    const expected = '/h?ll?';
    
    defineProperty(process, 'platform', {
        value: platform,
    });
    
    t.equal(result, expected);
    t.end();
});

test('putout: parse-sep: complex path: .', (t) => {
    const {platform} = process;
    
    defineProperty(process, 'platform', {
        value: 'linux',
    });
    
    const result = parseSep('/.cache/.putoutcache');
    const expected = '/\\.cache/\\.putoutcache';
    
    defineProperty(process, 'platform', {
        value: platform,
    });
    
    t.equal(result, expected);
    t.end();
});
