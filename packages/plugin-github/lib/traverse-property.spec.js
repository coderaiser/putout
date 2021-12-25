'use strict';

const test = require('supertape');
const {template} = require('putout');

const {traverseProperty} = require('./traverse-property');

test('operate: traverseProperty', (t) => {
    const object = template.ast('x({"a": "b"})');
    const [propertyPath] = traverseProperty(object, 'a');
    
    t.equal(propertyPath.node.key.value, 'a');
    t.end();
});

