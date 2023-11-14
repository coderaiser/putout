'use strict';

const removeBlankLines = require('remove-blank-lines');

const maybeNewline = (a) => a.at(-1) === '\n' ? a : `${a}\n`;
const createPrefix = (name) => `${name}(`;
const createSuffix = () => ');\n';

const __json = '__putout_processor_json';
const __filesystem = '__putout_processor_filesystem';

module.exports.__json = __json;
module.exports.__filesystem = __filesystem;

module.exports.toJS = (source, name = __json) => {
    const prefix = createPrefix(name);
    const suffix = createSuffix();
    
    return `${prefix}${source}${suffix}`;
};

module.exports.fromJS = (source, name = __json) => {
    const prefix = createPrefix(name);
    const suffix = createSuffix();
    const length = source.length - suffix.length;
    const sliced = source.slice(prefix.length, length);
    
    return maybeNewline(removeBlankLines(sliced));
};
