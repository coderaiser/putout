'use strict';

const {test, stub} = require('supertape');
const {renameFile} = require('./filesystem');

test('putout: cli: filesystem', (t) => {
    const renameSync = stub();
    
    renameFile('/hello/world', '/hello/hello', {
        renameSync,
    });
    
    const expected = [
        '/hello/world',
        '/hello/hello',
    ];
    
    t.calledWith(renameSync, expected);
    t.end();
});
