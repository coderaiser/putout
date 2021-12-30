'use strict';

const test = require('supertape');
const parse = require('./parse');
const generate = require('./generate');
const babel = require('./parsers/babel');
const print = require('./print');

const {stringify} = JSON;

test('putout: engina-parser: parse + generate = sourcemap', (t) => {
    const source = `const hello = 'world';`;
    const ast = babel.parse(source, {
        sourceFilename: 'hello.js',
    });
    
    const {map} = generate(ast, {sourceMaps: true}, {
        'hello.js': source,
    });
    
    t.ok(map, 'returns map');
    t.end();
});

test('putout: engina-parser: parse + print = sourcemap', (t) => {
    const source = `const hello = 'world';`;
    const ast = parse(source, {
        sourceFileName: 'hello.js',
    });
    
    const code = print(ast, {sourceMapName: 'hello.map'});
    const expected = source + '\n//' + stringify({
        version: 3,
        sources: [ 'hello.js' ],
        names: [],
        mappings: 'AAAA,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC',
        file: 'hello.map',
        sourcesContent: [ `const hello = 'world';` ],
    }) + '\n';
    
    t.equal(code, expected);
    t.end();
});

