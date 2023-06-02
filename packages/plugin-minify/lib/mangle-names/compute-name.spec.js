'use strict';

const {test} = require('supertape');
const {computeName} = require('./compute-name');

test('@putout/plugin-minify: mangle-names: computeName: 10', (t) => {
    const result = computeName('_temp10');
    const expected = 'k';
    
    t.equal(result, expected);
    t.end();
});

test('@putout/plugin-minify: mangle-names: computeName: 500', (t) => {
    const result = computeName('_temp500');
    const expected = '_temp500';
    
    t.equal(result, expected);
    t.end();
});
