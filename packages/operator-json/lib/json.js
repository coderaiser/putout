'use strict';

const removeBlankLines = require('remove-blank-lines');

const cut = (a) => a.slice(0, a.indexOf('('));
const createPrefix = (name) => `${cut(name)}(`;
const createSuffix = () => ');\n';
const maybeNewline = (a) => a.at(-1) === '\n' ? a : `${a}\n`;

const __json = '__putout_processor_json(__object)';
const __yaml = '__putout_processor_yaml(__object)';
const __filesystem = '__putout_processor_filesystem(__object)';
const __ignore = '__putout_processor_ignore(__array)';

const TYPES = [
    __json,
    __yaml,
    __filesystem,
    __ignore,
].map(cut);

module.exports.__json = __json;
module.exports.__yaml = __yaml;
module.exports.__filesystem = __filesystem;
module.exports.__ignore = __ignore;

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

module.exports.isJSON = (source) => {
    for (const type of TYPES) {
        if (!source.indexOf(type))
            return true;
    }
    
    return false;
};
