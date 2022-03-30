'use strict';

const path = require('path');
const fs = require('fs');
const test = require('supertape');

const {
    transformFileSync,
    createConfigItem,
} = require('@babel/core');

const plugin = require('..');

function trim(str) {
    return str.replace(/^\s+|\s+$/, '');
}

const fixturesDir = path.join(__dirname, 'fixture');

for (const caseName of fs.readdirSync(fixturesDir)) {
    test(`babel plugin for putout: should ${caseName.split('-').join(' ')}`, (t) => {
        const fixtureDir = path.join(fixturesDir, caseName);
        const actualPath = path.join(fixtureDir, 'actual.js');
        
        const {code} = transformFileSync(actualPath, {
            code: true,
            plugins: [
                'transform-inline-consecutive-adds',
                createConfigItem([plugin, {
                    rules: {
                        'strict-mode': 'on',
                    },
                }]),
            ],
        });
        
        const expected = fs.readFileSync(path.join(fixtureDir, 'expected.js'), 'utf8');
        
        t.equal(trim(code), trim(expected));
        t.end();
    });
}

