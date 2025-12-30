'use strict';

const process = require('node:process');
const {join} = require('node:path');

const putout = require('putout');
const currify = require('currify');
const {initReport} = require('@putout/engine-reporter/report');

const {
    readFixture,
    writeFormatFixture,
    readFormatFixture,
} = require('../fixture');

const isUpdate = () => Boolean(Number(process.env.UPDATE));
const {isArray} = Array;

module.exports.format = currify((dir, options, t) => async (formatter, name, formatterOptions = {}) => {
    const full = join(dir, name);
    const [input, isTS] = readFixture(full);
    
    const {places} = putout(input, {
        fixCount: 1,
        isTS,
        ...options,
    });
    
    const report = initReport();
    
    const result = await report(formatter, {
        formatterOptions,
        name,
        source: input,
        places,
    });
    
    if (isUpdate()) {
        writeFormatFixture(full, result);
        return t.pass('fixed fixture updated');
    }
    
    const expected = readFormatFixture(full);
    
    const {is, output} = t.equal(result, expected);
    
    return {
        is,
        output,
        result,
    };
});

module.exports.noFormat = currify((dir, options, t) => async (formatter, name, formatterOptions = {}) => {
    const full = join(dir, name);
    const [input] = readFixture(full);
    const {places} = putout(input, options);
    
    const report = initReport();
    
    const result = await report(formatter, {
        name,
        places,
        formatterOptions,
    });
    
    const {is, output} = t.equal(result, '', 'should not format');
    
    return {
        is,
        output,
        result,
    };
});

module.exports.formatMany = currify((dir, options, t) => async (formatter, names, formatterOptions = {}) => {
    const joinTwo = (a) => (b) => join(a, b);
    
    if (!isArray(names))
        throw Error(`☝️ Looks like 'formatMany()' received 'names' with type: '${typeof names}', expected: 'array'`);
    
    const fullNames = names.map(joinTwo(dir));
    
    let result = '';
    
    const count = names.length;
    const report = initReport();
    
    for (let index = 0; index < count; index++) {
        const name = names[index];
        const full = fullNames[index];
        const [input] = readFixture(full);
        
        const {places} = putout(input, {
            fixCount: 1,
            ...options,
        });
        
        result += await report(formatter, {
            name,
            formatterOptions,
            source: input,
            places,
            index,
            count,
        });
    }
    
    const outputName = join(dir, String(names.join('-')));
    
    if (isUpdate()) {
        writeFormatFixture(outputName, result);
        return t.pass('fixed fixture updated');
    }
    
    const expected = readFormatFixture(outputName);
    const {is, output} = t.equal(result, expected);
    
    return {
        is,
        output,
        result,
    };
});
