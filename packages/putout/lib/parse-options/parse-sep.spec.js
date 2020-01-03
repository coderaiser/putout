'use strict';

const test = require('supertape');
const {reRequire} = require('mock-require');

const {defineProperty} = Object;

test('putout: parse-sep', (t) => {
    const {platform} = process;
    
    defineProperty(process, 'platform', {
        value: 'win32',
    });
    
    const parseSep = reRequire('./parse-sep');
    
    const result = parseSep('/hello');
    const expected = '\\\\hello';
    
    defineProperty(process, 'platform', {
        value: platform,
    });
    
    t.equal(result, expected);
    t.end();
});

test('putout: parse-sep', (t) => {
    const {platform} = process;
    
    defineProperty(process, 'platform', {
        value: 'linux',
    });
    
    const parseSep = reRequire('./parse-sep');
    
    const result = parseSep('/hello');
    const expected = '/hello';
    
    defineProperty(process, 'platform', {
        value: platform,
    });
    
    t.equal(result, expected);
    t.end();
});

