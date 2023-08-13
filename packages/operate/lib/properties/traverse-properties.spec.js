'use strict';

const test = require('supertape');
const {template} = require('putout');

const {traverseProperties} = require('./traverse-properties');

test('operate: traverse-properties', (t) => {
    const object = template.ast('x({"a": "b"})');
    const [propertyPath] = traverseProperties(object, 'a');
    
    t.equal(propertyPath.node.key.value, 'a');
    t.end();
});
