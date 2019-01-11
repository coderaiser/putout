'use strict';

const {join} = require('path');
const {readFileSync} = require('fs');

const tryTo = require('try-to-tape');
const tape = tryTo(require('tape'));
const putout = require('putout');
const diff = require('jest-diff');
const strip = require('strip-ansi');

const isString = (a) => typeof a === 'string';

const wrap = (dir, plugin, test) => (str, fn) => {
    test(str, (t) => {
        t.transforms = transforms(t, dir, plugin);
        t.messages = messages(t, dir, plugin);
        t.equals = equals(t, t.equals);
        t.deepEquals = deepEquals(t, t.deepEquals);
        
        fn(t);
    });
};

module.exports = (dir, plugin) => {
    const dirFixture = join(__dirname, 'fixture');
    const newTape = wrap(dirFixture, plugin, tape);
    
    newTape.only = wrap(dirFixture, plugin, tape.only);
    newTape.skip = wrap(dirFixture, plugin, tape.skip);
    
    return newTape;
};

const transforms = (t, dir, plugin) => (name, transformed) => {
    const full = join(dir, name);
    const fromFile = readFileSync(`${full}.js`, 'utf8');
    const expected = isString(transformed) ? transformed : readFileSync(`${full}-fix.js`, 'utf8');
    
    const plugins = [
        plugin,
    ];
    
    const {code} = putout(fromFile, {plugins});
    
    t.equal(code, expected, 'should equal');
    showDiff(code, expected);
};

const messages = (t, dir, plugin) => (name, message) => {
    const full = join(dir, name);
    const source = readFileSync(`${full}.js`, 'utf8');
    
    const plugins = [
        plugin,
    ];
    
    const {places} = putout(source, {plugins});
    const result = places[0].message;
    
    t.equal(result, message, 'should equal');
    showDiff(result, message);
};

function showDiff(a, b) {
    const diffed = diff(a, b);
    
    if (strip(diffed) !== 'Compared values have no visual difference.')
        process.stdout.write(`${diffed}\n`);
}

const equals = (t, equals) => (a, b, msg) =>{
    equals(a, b, msg);
    showDiff(a, b);
};

const deepEquals= (t, deepEquals) => (a, b, msg) =>{
    deepEquals(a, b, msg);
    showDiff(a, b);
};

