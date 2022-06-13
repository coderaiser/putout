// declare-after-require

'use strict';

const fs = require('fs');
const m = require('m');

const abc = 'b';
const isString = 'x';
const isObject = (a) => a && typeof a === 'object';

fs.writeFile(isObject());

function hello() {
    const world = 'world';
}
