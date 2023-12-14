'use strict';

const {
    parse,
    operator,
    print,
    template,
} = require('putout');

const {test} = require('supertape');
const {
    getProperty,
    getProperties,
    traverseProperties,
} = require('.');

const {traverse} = operator;

test('operate: properties: getProperties', (t) => {
    const ast = parse(`({"hello": 'world'})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            const {helloPath} = getProperties(path, ['hello']);
            helloPath.remove();
        },
    });
    
    const result = print(ast);
    const expected = '({});\n';
    
    t.equal(result, expected);
    t.end();
});

test('operate: properties: getProperties: Identifier', (t) => {
    const ast = parse(`({hello: 'world'})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            const {helloPath} = getProperties(path, ['hello']);
            helloPath.remove();
        },
    });
    
    const result = print(ast);
    const expected = '({});\n';
    
    t.equal(result, expected);
    t.end();
});

test('operate: properties: getProperty', (t) => {
    const ast = parse(`({"hello": 'world'})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            const helloPath = getProperty(path, 'hello');
            helloPath.remove();
        },
    });
    
    const result = print(ast);
    const expected = '({});\n';
    
    t.equal(result, expected);
    t.end();
});

test('operate: properties: getProperty: not found', (t) => {
    let result;
    const ast = parse(`({"hello": 'world'})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            result = getProperty(path, 'world');
        },
    });
    
    t.notOk(result);
    t.end();
});

test('operate: properties: traverse-properties', (t) => {
    const object = template.ast('x({"a": "b"})');
    const [propertyPath] = traverseProperties(object, 'a');
    
    t.equal(propertyPath.node.key.value, 'a');
    t.end();
});

test('operate: properties: getProperties: SpreadElement', (t) => {
    const ast = parse(`({hello: 'world', ...x})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            const {helloPath} = getProperties(path, ['hello']);
            
            if (!helloPath)
                return;
            
            helloPath.remove();
        },
    });
    
    const result = print(ast);
    const expected = '({...x});\n';
    
    t.equal(result, expected);
    t.end();
});
