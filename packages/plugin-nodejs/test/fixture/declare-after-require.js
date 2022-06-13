// declare-after-require

'use strict';

const isObject = (a) => a && typeof a === 'object';
const isString = 'x';

const fs = require('fs');
const abc = 'b';
const m = require('m');

fs.writeFile(isObject());

function hello() {
    const world = 'world';
}
