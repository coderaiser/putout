'use strict';

const {readFileSync} = require('fs');
const {join} = require('path');

const test = require('tape');

const putout = require('..');

const dirFixture = join(__dirname, 'fixture');
const readFixture = (name) => readFileSync(join(dirFixture, `${name}.js`), 'utf8');
const fixture = {
    noVars: readFixture('no-vars'),
    rootVars: readFixture('root-vars'),
    fnVars: readFixture('fn-vars'),
};

test('putout: no vars', (t) => {
    const result = putout(fixture.noVars);
    const expected = {
        code: '',
        unused: [],
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: root vars', (t) => {
    const {code} = putout(fixture.rootVars);
    const expected = 'const str = \'hello\';\n';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

