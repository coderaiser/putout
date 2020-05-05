'use strict';

const {isProgram} = require('@babel/types');
const wraptile = require('wraptile');

const findPath = require('./find-path');

const name = '_putout_runner_replace';
const hasWatermark = (watermark) => (path) => path[name] && path[name].has(watermark);

module.exports = (from, to, path) => {
    const {
        watermark,
        highWatermark,
    } = create(from, to, path);
    
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
    path[name] = path[name] || new Set();
    program[name] = program[name] || new Set();
}

module.exports.add = add;
function add({path, program, watermark, highWatermark}) {
    path[name].add(watermark);
    program[name].add(highWatermark);
}

module.exports.has = has;
function has({path, program, watermark, highWatermark}) {
    if (path[name].has(watermark) || path.findParent(hasWatermark(watermark)))
        return true;
    
    if (program[name].has(highWatermark))
        return true;
    
    return false;
}

