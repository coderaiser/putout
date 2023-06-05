'use strict';

const test = require('supertape');
const wrapPlugins = require('./wrap-plugin');

test('putout: loader: wrap plugins: wrong namespace', (t) => {
    const name = 'hello';
    const result = wrapPlugins(name, '');
    
    t.notOk(result, 'should return null');
    t.end();
});
