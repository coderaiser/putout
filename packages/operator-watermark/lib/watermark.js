import wraptile from 'wraptile';
import {types} from '@putout/babel';
import findPath from './find-path.js';

const {isProgram} = types;
const hasWatermark = (watermark) => (path) => path.node?.[__watermark]?.has(watermark);

const __watermark = '__putout_runner_replace';

export const watermark = (from, to, path) => {
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

export function create(from, to, path) {
    const watermark = `${from} -> ${to}`;
    const highWatermark = `${findPath(path)}: ${watermark}`;
    
    return {
        watermark,
        highWatermark,
    };
}

export function init({path, program}) {
    if (path.node)
        path.node[__watermark] = path.node[__watermark] || new Set();
    
    program.node[__watermark] = program.node[__watermark] || new Set();
}

export function add({path, program, watermark, highWatermark}) {
    init({
        path,
        program,
    });
    
    path?.node[__watermark].add(watermark);
    program.node[__watermark].add(highWatermark);
}

export const clearWatermark = (node) => {
    delete node?.[__watermark];
};

export function has({path, program, watermark, highWatermark}) {
    const {node} = path;
    const {loc} = node;
    
    if (node?.[__watermark].has(watermark) || path.findParent(hasWatermark(watermark)) && !loc)
        return true;
    
    return program.node[__watermark].has(highWatermark);
}
