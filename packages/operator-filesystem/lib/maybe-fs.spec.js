'use strict';

const {test} = require('supertape');
const {start, pause} = require('./maybe-fs');

test('@putout/operator-filesystem: pause', (t) => {
    pause();
    
    t.ok('pause');
    t.end();
});

test('@putout/operator-filesystem: start', (t) => {
    start();
    
    t.ok('start');
    t.end();
});
