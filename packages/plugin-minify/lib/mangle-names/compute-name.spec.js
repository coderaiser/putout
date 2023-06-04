'use strict';

const {test} = require('supertape');
const {computeName} = require('./compute-name');

test('@putout/plugin-minify: mangle-names: computeName: 10', (t) => {
    const all = {};
    const result = computeName({
        index: 10,
        all,
        uid: '',
    });
    const expected = 'k';
    
    t.equal(result, expected);
    t.end();
});

test('@putout/plugin-minify: mangle-names: computeName: 500', (t) => {
    const all = {};
    const result = computeName({
        index: 500,
        all,
        uid: '_temp500',
    });
    const expected = 't500';
    
    t.equal(result, expected);
    t.end();
});

test('@putout/plugin-minify: mangle-names: computeName: t500: declared', (t) => {
    const all = {
        t500: true,
    };
    
    const result = computeName({
        index: 500,
        all,
        uid: '_temp500',
    });
    const expected = '_t500';
    
    t.equal(result, expected);
    t.end();
});

test('@putout/plugin-minify: mangle-names: computeName: t500, _t500: declared', (t) => {
    const all = {
        t500: true,
        _t500: true,
    };
    
    const result = computeName({
        index: 500,
        all,
        uid: '_temp500',
    });
    const expected = '_temp500';
    
    t.equal(result, expected);
    t.end();
});
