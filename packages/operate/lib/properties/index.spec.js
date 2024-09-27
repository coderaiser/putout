'use strict';

const {test} = require('supertape');
const tryCatch = require('try-catch');
const {
    parse,
    operator,
    print,
    template,
} = require('putout');

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

test('operate: properties: getProperty: SpreadElement', (t) => {
    const ast = parse(`({"hello": 'world', ...x})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            const helloPath = getProperty(path, 'hello');
            helloPath.remove();
        },
    });
    
    const result = print(ast);
    const expected = '({...x});\n';
    
    t.equal(result, expected);
    t.end();
});

test('operate: properties: getProperty: ObjectPattern', (t) => {
    const ast = parse(`const {hello} = b`);
    
    traverse(ast, {
        ObjectPattern: (path) => {
            const helloPath = getProperty(path, 'hello');
            helloPath.remove();
        },
    });
    
    const result = print(ast);
    const expected = 'const {} = b;\n';
    
    t.equal(result, expected);
    t.end();
});

test('operate: properties: getProperty: not object', (t) => {
    const ast = parse(`const a = "hello"`);
    let string;
    
    traverse(ast, {
        StringLiteral: (path) => {
            string = path;
        },
    });
    
    const [error] = tryCatch(getProperty, string, 'hello');
    
    t.equal(error.message, `☝️Looks like path is not 'ObjectExpression | ObjectPattern', but: 'StringLiteral' for path: "hello"`);
    t.end();
});
