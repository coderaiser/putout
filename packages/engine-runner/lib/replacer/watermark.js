import wraptile from 'wraptile';
import {types} from '@putout/babel';
import findPath from './find-path.js';

const {isProgram} = types;
const name = '__putout_runner_replace';
const hasWatermark = (watermark) => (path) => path.node?.[name]?.has(watermark);

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

export const REPLACE_WATERMARK = name;

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
        path.node[name] = path.node[name] || new Set();
    
    program.node[name] = program.node[name] || new Set();
}

export function add({path, program, watermark, highWatermark}) {
    init({
        path,
        program,
    });
    
    path?.node[name].add(watermark);
    program.node[name].add(highWatermark);
}

export function has({path, program, watermark, highWatermark}) {
    const {node} = path;
    const {loc} = node;
    
    if (node?.[name].has(watermark) || path.findParent(hasWatermark(watermark)) && !loc)
        return true;
    
    return program.node[name].has(highWatermark);
}
