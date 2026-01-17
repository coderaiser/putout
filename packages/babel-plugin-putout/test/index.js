import {readdirSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import test from 'supertape';
import {
    transformFileSync,
    createConfigItemSync,
} from '@babel/core';
import plugin from '../lib/index.js';

const trim = (str) => str.replace(/^\s+|\s+$/, '');

const fixturesDir = new URL('fixture', import.meta.url).pathname;

for (const caseName of readdirSync(fixturesDir)) {
    test(`babel plugin for putout: should ${caseName
        .split('-')
        .join(' ')}`, (t) => {
        const fixtureDir = join(fixturesDir, caseName);
        const actualPath = join(fixtureDir, 'actual.js');
        
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
        
        const expected = readFileSync(join(fixtureDir, 'expected.js'), 'utf8');
        
        t.equal(trim(code), trim(expected));
        t.end();
    });
}
