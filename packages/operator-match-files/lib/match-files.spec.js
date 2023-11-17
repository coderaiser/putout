'use strict';

const test = require('supertape');
const putout = require('putout');
const {types} = require('@putout/babel');

const {
    __json,
    __filesystem,
    toJS,
} = require('@putout/operator-json');

const {
    findFile,
    readFileContent,
} = require('@putout/operator-filesystem');

const {matchFiles} = require('./match-files.js');
const {ObjectProperty, StringLiteral} = types;
const {parse} = putout;
const {stringify} = JSON;
const noop = () => {};

test('putout: operator: match-files: places', (t) => {
    const plugin = {
        report: () => 'hello',
        fix: noop,
        traverse: ({push}) => ({
            [__json]: push,
        }),
    };
    
    const source = stringify({
        type: 'directory',
        filename: '/',
        files: [{
            type: 'file',
            filename: 'tsconfig.json',
        }],
    });
    
    const jsSource = toJS(source, __filesystem);
    
    const files = {
        'tsconfig.json': plugin,
    };
    
    const {places} = putout(jsSource, {
        fix: false,
        plugins: [
            ['match-files', matchFiles(files)],
        ],
    });
    
    const expected = [{
        message: 'hello',
        position: {
            column: 74,
            line: 1,
        },
        rule: 'match-files',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: operator: match-files: transform', (t) => {
    const plugin = {
        report: () => 'hello',
        fix: (path) => {
            const property = ObjectProperty(StringLiteral('hello'), StringLiteral('world'));
            
            path.node.properties.push(property);
        },
        traverse: ({push}) => ({
            [__json]: (path) => {
                const __objectPath = path.get('arguments.0');
                
                if (__objectPath.node.properties.length)
                    return;
                
                push(__objectPath);
            },
        }),
    };
    
    const source = stringify({
        type: 'directory',
        filename: '/',
        files: [{
            type: 'file',
            filename: '/tsconfig.json',
        }],
    });
    
    const jsSource = toJS(source, __filesystem);
    
    const files = {
        'tsconfig.json': plugin,
    };
    
    const {code} = putout(jsSource, {
        plugins: [
            ['match-files', matchFiles(files)],
        ],
    });
    
    const ast = parse(code);
    
    const [filePath] = findFile(ast, 'tsconfig.json');
    const content = readFileContent(filePath);
    const result = JSON.parse(content);
    
    const expected = {
        hello: 'world',
    };
    
    t.deepEqual(result, expected);
    t.end();
});
