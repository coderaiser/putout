'use strict';

const {join} = require('path');
const {readFileSync} = require('fs');

const tape = require('supertape');
const putout = require('putout');

const isString = (a) => typeof a === 'string';
const {isArray} = Array;

const wrap = (dir, plugin, test) => (str, fn) => {
    test(str, (t) => {
        t.transform = transform(t, dir, plugin);
        t.report = report(t, dir, plugin);
        t.transformCode = transformCode(t, plugin);
        t.reportCode = reportCode(t, plugin);
        
        fn(t);
    });
};

module.exports = (dir, plugin) => {
    const dirFixture = join(dir, 'fixture');
    const plugins = getPlugins(plugin);
    
    const newTape = wrap(dirFixture, plugins, tape);
    newTape.only = wrap(dirFixture, plugins, tape.only);
    newTape.skip = wrap(dirFixture, plugins, tape.skip);
    
    return newTape;
};

const transform = (t, dir, plugins) => (name, transformed, addons = {}) => {
    const full = join(dir, name);
    const input = readFileSync(`${full}.js`, 'utf8');
    const output = isString(transformed) ? transformed : readFileSync(`${full}-fix.js`, 'utf8');
    
    plugins[0] = {
        ...plugins[0],
        ...addons,
    };
    transformCode(t, plugins)(input, output);
};

const transformCode = (t, plugins) => (input, output) => {
    const {code} = putout(input, {plugins});
    
    t.equal(code, output, 'should equal');
};

const getMessage = ({message}) => message;

const report = (t, dir, plugins) => (name, message) => {
    const full = join(dir, name);
    const source = readFileSync(`${full}.js`, 'utf8');
    
    reportCode(t, plugins)(source, message);
};

const reportCode = (t, plugins) => (source, message) => {
    const {places} = putout(source, {plugins});
    const resultMessages = places.map(getMessage);
    
    if (isArray(message)) {
        t.deepEqual(resultMessages, message, 'should equal');
        return;
    }
    
    t.equal(resultMessages[0], message, 'should equal');
};

function getPlugins(plugin) {
    return [
        plugin,
    ].filter(Boolean);
}

