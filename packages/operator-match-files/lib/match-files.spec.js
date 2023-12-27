'use strict';

const tryCatch = require('try-catch');
const test = require('supertape');
const putout = require('putout');
const {types} = require('@putout/babel');
const convertEsmToCommonjs = require('@putout/plugin-nodejs/convert-esm-to-commonjs');

const {
    __json,
    __filesystem,
    toJS,
    fromJS,
} = require('@putout/operator-json');

const {
    findFile,
    readFileContent,
} = require('@putout/operator-filesystem');

const {matchFiles} = require('./match-files.js');
const {ObjectProperty, StringLiteral} = types;

const {
    parse,
    transform,
    print,
} = putout;

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

test('putout: operator: match-files: no files found', (t) => {
    const plugin = {};
    const source = stringify({
        type: 'directory',
        filename: '/',
        files: [],
    });
    
    const jsSource = toJS(source, __filesystem);
    
    const files = {
        'tsconfig.json': plugin,
    };
    
    const {places} = putout(jsSource, {
        plugins: [
            ['match-files', matchFiles(files)],
        ],
    });
    
    t.notOk(places.length);
    t.end();
});

test('putout: operator: match-files: no plugin', (t) => {
    const plugin = '';
    const files = {
        'tsconfig.json': plugin,
    };
    
    const [error] = tryCatch(matchFiles, files);
    
    t.equal(error?.message, `☝️ Looks like provided to 'matchFiles()' typeof of plugin is not an 'object' but 'string'`);
    t.end();
});

test('putout: operator: match-files: js', (t) => {
    const content = `export const hello = 'world'`;
    const source = stringify({
        type: 'directory',
        filename: '/',
        files: [{
            type: 'file',
            filename: 'index.cjs',
            content,
        }],
    });
    
    const files = {
        '*.cjs': convertEsmToCommonjs,
    };
    
    const jsSource = toJS(source, __filesystem);
    const ast = parse(jsSource);
    
    transform(ast, jsSource, {
        plugins: [
            ['match-files', matchFiles(files)],
        ],
    });
    
    const [filePath] = findFile(ast, 'index.cjs');
    const result = readFileContent(filePath);
    const expected = `module.exports.hello = 'world';\n`;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: match-files: couple', (t) => {
    const content = `export const hello = 'world'`;
    const source = stringify([
        '/',
        ['/index.cjs', content],
        ['/.madrun.cjs', content],
    ]);
    
    const files = {
        '*.cjs': convertEsmToCommonjs,
    };
    
    const jsSource = toJS(source, __filesystem);
    const ast = parse(jsSource);
    
    transform(ast, jsSource, {
        plugins: [
            ['match-files', matchFiles(files)],
        ],
    });
    
    const result = JSON.parse(fromJS(
        print(ast),
        __filesystem,
    ));
    
    const expected = ['/', ['/index.cjs', 'bW9kdWxlLmV4cG9ydHMuaGVsbG8gPSAnd29ybGQnOwo='], ['/.madrun.cjs', 'bW9kdWxlLmV4cG9ydHMuaGVsbG8gPSAnd29ybGQnOwo=']];
    
    t.deepEqual(result, expected);
    t.end();
});
