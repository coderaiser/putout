'use strict';

const wraptile = require('wraptile');

const {types} = require('@putout/babel');
const findPath = require('./find-path');

const {isProgram} = types;
const name = '__putout_runner_replace';
const hasWatermark = (watermark) => (path) => path.node?.[name]?.has(watermark);

module.exports = (from, to, path) => {
    const {watermark, highWatermark} = create(from, to, path);
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

module.exports.REPLACE_WATERMARK = name;

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
    if (path.node)
        path.node[name] = path.node[name] || new Set();
    
    program.node[name] = program.node[name] || new Set();
}

module.exports.add = add;
function add({path, program, watermark, highWatermark}) {
    init({
        path,
        program,
    });
    
    path?.node[name].add(watermark);
    program.node[name].add(highWatermark);
}

module.exports.has = has;
function has({path, program, watermark, highWatermark}) {
    if (path.node?.[name].has(watermark) || path.findParent(hasWatermark(watermark)))
        return true;
    
    return program.node[name].has(highWatermark);
}
