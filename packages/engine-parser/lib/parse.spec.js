'use strict';

const test = require('supertape');
const parse = require('./parse');
const generate = require('./generate');
const babel = require('./parsers/babel');
const print = require('./print');

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

test('putout: engina-parser: parse: sourceFilename passed', (t) => {
    const source = `const hello = 'world';`;
    const ast = babel.parse(source, {
        sourceFilename: 'hello.js',
    });
    
    t.equal(ast.loc.filename, 'hello.js');
    t.end();
});

test('putout: engina-parser: parse + print = sourcemap', (t) => {
    const source = `const hello = 'world';`;
    const ast = parse(source, {
        sourceFileName: 'hello.js',
    });
    
    const code = print(ast, {sourceMapName: 'hello.map'});
    const expected = `${source}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbGxvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImhlbGxvLm1hcCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGhlbGxvID0gJ3dvcmxkJzsiXX0=\n`;
    
    t.equal(code, expected);
    t.end();
});

