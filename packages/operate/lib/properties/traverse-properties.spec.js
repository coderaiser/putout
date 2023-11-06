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
