'use strict';

const {isProgram} = require('@babel/types');
const wraptile = require('wraptile');

const findPath = require('./find-path');

module.exports = (from, to, path) => {
    const {
        watermark,
        highWatermark,
    } = create(
        from,
        to,
        path,
    );
    const program = path.findParent(isProgram);
    
    const options = {
        watermark,
        highWatermark,
        program,
        path,
    };
    
    return {
        init: wraptile(init, options),
        has: wraptile(has, options),
        add: wraptile(add, options),
    };
};

module.exports.create = create;
function create(from, to, path) {
    const watermark = `${from} -> ${to}`;
    const highWatermark = `${findPath(path)}: ${watermark}`;
    
    return {
        watermark,
        highWatermark,
    };
}

module.exports.init = init;
function init({path, program}) {
    path._putout = path._putout || new Set();
    program._putout = program._putout || new Set();
}

module.exports.add = add;
function add({path, program, watermark, highWatermark}) {
    path._putout.add(watermark);
    program._putout.add(highWatermark);
}

module.exports.has = has;
function has({path, program, watermark, highWatermark}) {
    if (path._putout.has(watermark))
        return true;
    
    if (program._putout.has(highWatermark))
        return true;
    
    return false;
}

