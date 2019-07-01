'use strict';

const {join} = require('path');
const {
    readFileSync,
    readdirSync,
} = require('fs');

const tryCatch = require('try-catch');
const camelCase = require('just-camel-case');

const dirFixture = join(__dirname, 'fixture');
const readFixture = (name) => {
    const longName = join(dirFixture, name);
    
    const [e, data] = tryCatch(readFileSync, `${longName}.ts`, 'utf8');
    
    if (!e)
        return data;
    
    return readFileSync(`${longName}.js`, 'utf8');
};

const rmExt = (a) => a.replace('.js', '');

module.exports.readFixtures = () => {
    const names = readdirSync(join(__dirname, 'fixture'))
        .map(rmExt);
    
    const result = {};
    
    for (const name of names) {
        const prop = camelCase(name);
        result[prop] = readFixture(name);
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

