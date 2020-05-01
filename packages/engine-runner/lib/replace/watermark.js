'use strict';

const {isProgram} = require('@babel/types');
const findPath = require('./find-path');

const create = (from, to, path) => {
    const watermark = `${from} -> ${to}`;
    const highWatermark = `${watermark} :> ${findPath(path)}`;
    
    return {
        watermark,
        highWatermark,
    };
};

module.exports.init = (from, to, path) => {
    path._putout = path._putout || new Map();
    
    const file = path.findParent(isProgram);
    file._putout = file._putout || new Map();
};

module.exports.set = (from, to, path) => {
    const {
        watermark,
        highWatermark,
    } = create(
        from,
        to,
        path,
    );
    const file = path.findParent(isProgram);
    
    path._putout.set(watermark);
    file._putout.set(highWatermark);
};

module.exports.has = (from, to, path) => {
    const {
        watermark,
        highWatermark,
    } = create(
        from,
        to,
        path,
    );
    
    if (path._putout.has(watermark))
        return true;
    
    const file = path.findParent(isProgram);
    
    if (file._putout.has(highWatermark))
        return true;
    
    return false;
};

