import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transformFileSync, createConfigItem } from '@babel/core';
import plugin from '../src/index.js';

function trim(str) {
    return str.replace(/^\s+|\s+$/, '');
}

describe('babel plugin for putout', () => {
    const fixturesDir = path.join(__dirname, 'fixture');
    fs.readdirSync(fixturesDir).map((caseName) => {
        it(`should ${caseName.split('-').join(' ')}`, () => {
            const fixtureDir = path.join(fixturesDir, caseName);
            const actualPath = path.join(fixtureDir, 'actual.js');
            
            const actual = transformFileSync(actualPath, {
                code: true,
                plugins: [
                    'transform-inline-consecutive-adds',
                    createConfigItem([plugin, {
                        rules: {
                            'strict-mode': true,
                        },
                    }]),
                ],
            }).code;
            
            const expected = fs.readFileSync(path.join(fixtureDir, 'expected.js'), 'utf8');
            
            assert.strictEqual(trim(actual), trim(expected));
        });
    });
});

