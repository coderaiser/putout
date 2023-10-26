'use strict';

const {join} = require('path');
const {readFileSync} = require('fs');
const tryCatch = require('try-catch');
const camelCase = require('just-camel-case');
const dirFixture = join(__dirname, 'fixture');

const readFixture = (dir, name) => {
    const longName = join(dir, name);
    const [e, data] = tryCatch(readFileSync, `${longName}.ts`, 'utf8');
    
    if (!e)
        return data;
    
    return readFileSync(`${longName}.js`, 'utf8');
};

module.exports.readFixtures = (dir, names) => {
    if (!names) {
        names = dir;
        dir = dirFixture;
    } else {
        dir = join(dir, 'fixture');
    }
    
    const result = {};
    
    for (const name of names) {
        const prop = camelCase(name);
        
        result[prop] = readFixture(dir, name);
    }
    
    return new Proxy(result, handler);
};

const handler = {
    get(obj, prop) {
        if (obj[prop] === undefined)
            throw Error(`"${prop}" not found!`);
        
        return obj[prop];
    },
};
