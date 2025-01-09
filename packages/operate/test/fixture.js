'use strict';

const {join} = require('node:path');

const {readFileSync, readdirSync} = require('node:fs');

const tryCatch = require('try-catch');
const camelCase = require('just-camel-case');

const readFixture = (dir, name) => {
    const longName = join(dir, 'fixture', name);
    
    const [e, data] = tryCatch(readFileSync, `${longName}.ts`, 'utf8');
    
    if (!e)
        return data;
    
    return readFileSync(`${longName}.js`, 'utf8');
};

const rmExt = (a) => a.replace('.js', '');

module.exports.readFixtures = (dir) => {
    const names = readdirSync(join(dir, 'fixture')).map(rmExt);
    
    const result = {};
    
    for (const name of names) {
        const prop = camelCase(name);
        result[prop] = readFixture(dir, name);
    }
    
    return new Proxy(result, handler);
};

const handler = {
    get(obj, prop) {
        if (!obj[prop])
            throw Error(`"${prop}" not found!`);
        
        return obj[prop];
    },
};
