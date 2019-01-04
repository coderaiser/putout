'use strict';

const test = require('tape');
const tryCatch = require('try-catch');

const removeUnused = require('../lib/rm-unused-vars/remove-unused');

test('remove-unused: error', (t) => {
    const remove = () => {
        throw Error('hello');
    };
    
    const start = {
        line: 10,
        column: 0,
    };
    
    const node = {
        loc: {
            start,
        }
    };
    
    const items = [{
        path: {
            node,
            remove,
        }
    }];
    
    const [e] = tryCatch(removeUnused, items);
    
    t.equal(e.loc, start, 'should equal');
    t.end();
});

