'use strict';

const {join} = require('path');
const {readFileSync} = require('fs');

const camelCase = require('just-camel-case');

const dirFixture = join(__dirname, 'fixture');
const readFixture = (name) => readFileSync(join(dirFixture, `${name}.js`), 'utf8');

module.exports.readFixtures = (names) => {
    const result = {};
    
    for (const name of names) {
        const prop = camelCase(name);
        result[prop] = readFixture(name);
    }
    
    return result;
};

