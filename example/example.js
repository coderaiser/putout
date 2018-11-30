'use strict';

const {
    readFileSync,
    writeFileSync,
} = require('fs');

const removeUnused = require('./lib/main');

const input = readFileSync('./mock.js', 'utf8');
const {code, unused} = removeUnused(input, {
    remove: true,
});

for (const item of unused) {
    const {loc, name} = item;
    const {line, column} = loc;
    console.log(` ${line}:${column} error  "${name}" is defined but never used`);
}

writeFileSync('./mock.js', code);

