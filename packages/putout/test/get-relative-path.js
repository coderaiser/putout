'use strict';

const test = require('supertape');
const getRelativePath = require('../lib/get-relative-path');

test('putout: get-relative-path', (t) => {
    const name = getRelativePath('/cloudcmd/test', '/cloudcmd');
    
    t.equal(name, 'test');
    t.end();
});

test('putout: get-relative-path: no name', (t) => {
    const name = getRelativePath();
    
    t.equal(name, '');
    t.end();
});

test('putout: get-relative-path: root', (t) => {
    const name = getRelativePath('/cloudcmd/test', '/');
    
    t.equal(name, 'cloudcmd/test');
    t.end();
});

test('putout: get-relative-path: root', (t) => {
    const name = getRelativePath('/cloudcmd/test', '');
    
    t.equal(name, '/cloudcmd/test');
    t.end();
});

