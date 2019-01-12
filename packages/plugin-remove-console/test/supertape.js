'use strict';

const tryTo = require('try-to-tape');
const tape = tryTo(require('tape'));
const putout = require('putout');
const diff = require('jest-diff');
const strip = require('strip-ansi');

const wrap = (test) => (str, fn) => {
    test(str, (t) => {
        t.equals = equals(t, t.equals);
        t.deepEquals = deepEquals(t, t.deepEquals);
        
        fn(t);
    });
};

const getNewTape = () => {
    const newTape = wrap(tape);
    
    newTape.only = wrap(tape.only);
    newTape.skip = wrap(tape.skip);
    
    return newTape;
};

const equals = (t, equals) => (a, b, msg) =>{
    equals(a, b, msg);
    showDiff(a, b);
};

const deepEquals = (t, deepEquals) => (a, b, msg) =>{
    deepEquals(a, b, msg);
    showDiff(a, b);
};

module.exports = getNewTape(tape);

function showDiff(a, b) {
    const diffed = diff(a, b);
    
    if (strip(diffed) !== 'Compared values have no visual difference.')
        process.stdout.write(`${diffed}\n`);
}

