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
    
    const expected = '_';
    
    t.equal(result, expected);
    t.end();
});

test('@putout/plugin-minify: mangle-names: computeName: t500: declared', (t) => {
    const all = {
        t500: true,
        _: true,
    };
    
    const result = computeName({
        index: 500,
        all,
        uid: '_temp500',
    });
    
    const expected = 'a';
    
    t.equal(result, expected);
    t.end();
});

test('@putout/plugin-minify: mangle-names: computeName: t500, _t500: declared', (t) => {
    const all = {
        t500: true,
        _t500: true,
        _: true,
        a: true,
        A: true,
    };
    
    const result = computeName({
        index: 500,
        all,
        uid: '_temp500',
    });
    
    const expected = 'aA';
    
    t.equal(result, expected);
    t.end();
});

test('@putout/plugin-minify: mangle-names: computeName: t500, _t500, _: declared', (t) => {
    const all = {
        t500: true,
        _t500: true,
        _: true,
        a: true,
        A: true,
        zZ: true,
    };
    
    const result = computeName({
        index: 500,
        all,
        uid: '_temp500',
    });
    
    const expected = 'aA';
    
    t.equal(result, expected);
    t.end();
});

test('@putout/plugin-minify: mangle-names: computeName: aa-zZ_: declared', (t) => {
    const all = new Proxy({}, {
        get() {
            return true;
        },
    });
    
    const result = computeName({
        index: 500,
        all,
        uid: '_temp500',
    });
    
    const expected = '_temp500';
    
    t.equal(result, expected);
    t.end();
});
