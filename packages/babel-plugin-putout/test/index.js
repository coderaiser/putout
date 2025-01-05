'use strict';

const path = require('node:path');
const fs = require('node:fs');
const test = require('supertape');

const {
    transformFileSync,
    createConfigItemSync,
} = require('@babel/core');

const plugin = require('..');

const trim = (str) => str.replace(/^\s+|\s+$/, '');

const fixturesDir = path.join(__dirname, 'fixture');

for (const caseName of fs.readdirSync(fixturesDir)) {
    test(`babel plugin for putout: should ${caseName
        .split('-')
        .join(' ')}`, (t) => {
        const fixtureDir = path.join(fixturesDir, caseName);
        const actualPath = path.join(fixtureDir, 'actual.js');
        
        const {code} = transformFileSync(actualPath, {
            code: true,
            plugins: [
                createConfigItemSync([
                    plugin, {
                        rules: {
                            'nodejs/add-missing-strict-mode': 'on',
                        },
                    },
                ]),
            ],
        });
        
        const expected = fs.readFileSync(path.join(fixtureDir, 'expected.js'), 'utf8');
        
        t.equal(trim(code), trim(expected));
        t.end();
    });
}
