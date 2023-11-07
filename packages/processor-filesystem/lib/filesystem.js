import filesystemCLI from '@putout/cli-filesystem';
import filesystem from '@putout/operator-filesystem';

filesystem.init(filesystemCLI);

const prefix = `__putout_processor_filesystem(`;
const sufix = ');\n';

export const files = [
    '.filesystem.json',
];

export const branch = (rawSource) => {
    const source = toJS(rawSource);
    
    return [{
        startLine: 0,
        source,
    }];
};

export const merge = (rawSource, list) => {
    const [source] = list;
    return fromJS(source) + '\n';
};

const toJS = (source) => `${prefix}${source}${sufix}`;

const fromJS = (source) => {
    const length = source.length - sufix.length;
    
    return source.slice(prefix.length, length);
};
