'use strict';

const test = require('supertape');
const {
    parse,
    template,
    traverse,
} = require('putout');

const {traverseProperties} = require('./traverse-properties');

test('operate: traverse-properties', (t) => {
    const object = template.ast('x({"a": "b"})');
    const [propertyPath] = traverseProperties(object, 'a');
    
    t.equal(propertyPath.node.key.value, 'a');
    t.end();
});

test('operate: traverse-properties: traverse', (t) => {
    const source = 'x({"a": "b"})';
    let propertyPath;
    
    traverse(parse(source), {
        CallExpression(path) {
            [propertyPath] = traverseProperties(path, 'a');
        },
    });
    
    t.equal(propertyPath.node.key.value, 'a');
    t.end();
});

test('operate: traverse-properties: traverse: ObjectExpression: path', (t) => {
    const source = '({"a": "b"})';
    let propertyPath;
    
    traverse(parse(source), {
        ObjectExpression(path) {
            [propertyPath] = traverseProperties(path, 'a');
        },
    });
    
    t.equal(propertyPath.node.key.value, 'a');
    t.end();
});

test('operate: traverse-properties: traverse: ObjectExpression: no parentPath', (t) => {
    const source = '({"a": "b"})';
    let propertyPath;
    
    traverse(parse(source), {
        ObjectExpression(path) {
            delete path.parentPath;
            [propertyPath] = traverseProperties(path, 'a');
        },
    });
    
    t.equal(propertyPath.node.key.value, 'a');
    t.end();
});

test('operate: traverse-properties: traverse: ObjectExpression: node', (t) => {
    const source = '({"a": "b"})';
    let propertyPath;
    
    traverse(parse(source), {
        ObjectExpression(path) {
            [propertyPath] = traverseProperties(path.node, 'a');
        },
    });
    
    t.equal(propertyPath.node.key.value, 'a');
    t.end();
});

test('operate: traverse-properties: traverse: ObjectExpression: firstLevel', (t) => {
    const source = '({"a": "b", "x": {"a": 5}})';
    let list = [];
    
    traverse(parse(source), {
        ObjectExpression(path) {
            list = traverseProperties(path, 'a', {
                firstLevel: true,
            });
            path.stop();
        },
    });
    
    t.equal(list.length, 1);
    t.end();
});
