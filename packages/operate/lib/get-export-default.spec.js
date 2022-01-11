'use strict';

const {
    parse,
    operator,
    print,
} = require('putout');

const {test} = require('supertape');
const {getExportDefault} = require('./get-export-default');

const {traverse} = operator;

test('operate: getExportDefault', (t) => {
    const ast = parse(`export default {}`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            const helloPath = getExportDefault(path);
            helloPath.remove();
        },
    });
    
    const result = print(ast);
    const expected = '';
    
    t.deepEqual(result, expected);
    t.end();
});

test('operate: getExportDefault: not found', (t) => {
    let result;
    const ast = parse(`({hello: 'world'})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            result = getExportDefault(path);
        },
    });
    
    t.notOk(result);
    t.end();
});

