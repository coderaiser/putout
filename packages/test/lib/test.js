'use strict';

const {join} = require('path');
const {
    readFileSync,
    writeFileSync,
    existsSync,
} = require('fs');

const tryCatch = require('try-catch');
const tape = require('supertape');
const putout = require('putout');

const isString = (a) => typeof a === 'string';
const {isArray} = Array;
const {entries} = Object;

const {UPDATE} = process.env;
const TS = {
    ENABLED: true,
    DISABLED: false,
};

const readFixture = (name) => {
    const [e, data] = tryCatch(readFileSync, `${name}.ts`, 'utf8');
    
    if (!e)
        return [data, TS.ENABLED];
    
    return [readFileSync(`${name}.js`, 'utf8'), TS.DISABLED];
};

const wrap = (dir, plugin, test) => (str, fn) => {
    test(str, (t) => {
        t.transform = transform(t, dir, plugin);
        t.noTransform = noTransform(t, dir, plugin);
        t.transformCode = transformCode(t, plugin);
        t.noTransformCode = noTransformCode(t, plugin);
        
        t.report = report(t, dir, plugin);
        t.reportCode = reportCode(t, plugin);
        
        t.formatSave = formatSave(t, dir, plugin);
        t.format = UPDATE ? t.formatSave : format(t, dir, plugin);
        t.formatManySave = formatManySave(t, dir, plugin);
        t.formatMany = UPDATE ? t.formatManySave : formatMany(t, dir, plugin);
        t.noFormat = noFormat(t, dir, plugin);
        
        fn(t);
    });
};

module.exports = (dir, plugin) => {
    const dirFixture = join(dir, 'fixture');
    const plugins = getPlugins(plugin);
    
    const newTape = wrap(dirFixture, plugins, tape);
    newTape.only = wrap(dirFixture, plugins, tape.only);
    newTape.skip = wrap(dirFixture, plugins, tape.skip);
    
    preTest(tape, plugin);
    
    return newTape;
};

const format = (t, dir, plugins) => (formatter, name) => {
    const full = join(dir, name);
    const outputName = `${full}-format`;
    const [input, isTS] = readFixture(full);
    const [expected] = readFixture(outputName);
    
    const {places} = putout(input, {fixCount: 1, isTS, plugins});
    
    const report = putout.initReport();
    const result = report(formatter, {
        name,
        source: input,
        places,
    });
    
    t.equal(result, expected);
    
    return result;
};

const noFormat = (t, dir, plugins) => (formatter, name) => {
    const full = join(dir, name);
    const [input] = readFixture(full);
    
    const {places} = putout(input, {plugins});
    
    const report = putout.initReport();
    const result = report(formatter, {
        name,
        places,
    });
    
    t.notOk(result, 'should not format');
    
    return result;
};

const formatMany = (t, dir, plugins) => (formatter, names) => {
    const joinTwo = (a) => (b) => join(a, b);
    const fullNames = names.map(joinTwo(dir));
    
    let result = '';
    
    const count = names.length;
    const report = putout.initReport();
    for (let index = 0; index < count; index++) {
        const name = names[index];
        const full = fullNames[index];
        const [input] = readFixture(full);
        
        const {places} = putout(input, {fixCount: 1, plugins});
        
        result += report(formatter, {
            name,
            source: input,
            places,
            index,
            count,
        });
    }
    
    const outputName = join(dir, `${names.join('-')}-format`);
    const [expected] = readFixture(outputName);
    
    t.equal(result, expected);
    
    return result;
};

const formatManySave = (t, dir, plugins) => (formatter, names) => {
    const name = `${names.join('-')}-format.js`;
    const outputName = join(dir, name);
    
    if (!existsSync(outputName))
        writeFileSync(outputName, '');
    
    const result = formatMany(t, dir, plugins)(formatter, names);
    
    writeFileSync(outputName, result);
};

const formatSave = (t, dir, plugins) => (formatter, name) => {
    const full = join(dir, name);
    const outputName = `${full}-format.js`;
    
    if (!existsSync(outputName))
        writeFileSync(outputName, '');
    
    const result = format(t, dir, plugins)(formatter, name);
    
    writeFileSync(outputName, result);
};

const transform = (t, dir, plugins) => (name, transformed, addons) => {
    const full = join(dir, name);
    const [input, isTS] = readFixture(full);
    const isStr = isString(transformed);
    
    const [output] = isStr ? [transformed] : readFixture(`${full}-fix`);
    
    addons = isString(transformed) ? addons : transformed;
    addons = addons || {};
    
    plugins[0] = {
        ...plugins[0],
        ...addons,
    };
    
    transformCode(t, plugins)(input, output, isTS);
};

const noTransform = (t, dir, plugins) => (name, transformed, addons) => {
    const full = join(dir, name);
    const [fixture] = readFixture(full);
    
    transform(t, dir, plugins)(name, fixture, addons);
};

const transformCode = (t, plugins) => (input, output, isTS) => {
    const {code} = putout(input, {isTS, plugins});
    
    t.equal(code, output, 'should equal');
};

const noTransformCode = (t, plugins) => (input) => {
    const {code} = putout(input, {plugins});
    
    t.equal(code, input, 'should equal');
};

const getMessage = ({message}) => message;

const report = (t, dir, plugins) => (name, message) => {
    const full = join(dir, name);
    const [source] = readFixture(full);
    
    reportCode(t, plugins)(source, message);
};

const reportCode = (t, plugins) => (source, message) => {
    const fix = false;
    const {places} = putout(source, {fix, plugins});
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

function preTest(test, plugin) {
    if (!plugin)
        return;
    
    const [name, {
        report,
        find,
        traverse,
        fix,
        rules,
    }] = entries(plugin).pop();
    
    if (rules) {
        test(`${name}: rules is an object`, (t) => {
            t.equal(typeof rules, 'object', 'should export "rules" object');
            t.end();
        });
        
        const entries = Object.entries(rules);
        for (const [entryName, plugin] of entries) {
            preTest(test, {
                [`${name}/${entryName}`]: plugin,
            });
        }
        
        return;
    }
    
    test(`${name}: report: is function`, (t) => {
        t.equal(typeof report, 'function', 'should export "report" function');
        t.end();
    });
    
    test(`${name}: find or traverse: is function`, (t) => {
        const typeofFind = typeof find === 'function';
        const typeofTraverse = typeof traverse === 'function';
        
        t.ok(typeofFind || typeofTraverse, 'should export "find" or "traverse" function');
        t.end();
    });
    
    test(`${name}: fix: is function`, (t) => {
        t.equal(typeof fix, 'function', 'should export "fix" function');
        t.end();
    });
}

