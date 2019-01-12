'use strict';

const {join} = require('path');
const {readFileSync} = require('fs');

const tape = require('supertape');
const putout = require('putout');

const isString = (a) => typeof a === 'string';
const {isArray} = Array;

const wrap = (dir, plugin, test) => (str, fn) => {
    test(str, (t) => {
        t.transforms = transforms(t, dir, plugin);
        t.messages = messages(t, dir, plugin);
        
        fn(t);
    });
};

module.exports = (dir, plugin) => {
    const dirFixture = join(dir, 'fixture');
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
};

const getMessage = ({message}) => message;

const messages = (t, dir, plugin) => (name, message) => {
    const full = join(dir, name);
    const source = readFileSync(`${full}.js`, 'utf8');
    
    const plugins = [
        plugin,
    ];
    
    const {places} = putout(source, {plugins});
    const resultMessages = places.map(getMessage);
    
    if (isArray(message)) {
        t.deepEqual(resultMessages, message, 'should equal');
        return;
    }
    
    t.equal(resultMessages[0], message, 'should equal');
};

