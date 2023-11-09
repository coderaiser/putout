import filesystemCLI from '@putout/cli-filesystem';
import filesystem from '@putout/operator-filesystem';
import {name} from './name.cjs';

const prefix = `${name}(`;
const sufix = ');\n';

export const files = [
    '.filesystem.json',
];

export const branch = (rawSource) => {
    filesystem.init(filesystemCLI);
    
    const source = toJS(rawSource);
    
    return [{
        startLine: 0,
        source,
    }];
};

export const merge = (rawSource, list) => {
    filesystem.deinit(filesystemCLI);
    
    const source = list.pop();
    
    return fromJS(source) + '\n';
};

const toJS = (source) => `${prefix}${source}${sufix}`;

const fromJS = (source) => {
    const length = source.length - sufix.length;
    
    return source.slice(prefix.length, length);
};
