'use strict';

const test = require('supertape');
const {parseTemplate} = require('./is');

test('compare: is: parseTemplate: program', (t) => {
    const [node] = parseTemplate('const t = "hi"', {
        program: true,
    });
    
    t.equal(node.type, 'Program');
    t.end();
});

