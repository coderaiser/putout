'use strict';

const removeBlankLines = require('remove-blank-lines');

const cut = (a) => a.slice(0, a.indexOf('('));
const createPrefix = (name) => {
    if (name.includes('('))
        return `${cut(name)}(`;
    
    return `${name}(`;
};

const createSuffix = () => ');\n';
const maybeNewline = (a) => a.at(-1) === '\n' ? a : `${a}\n`;

const __json_name = '__putout_processor_json';
const __yaml_name = '__putout_processor_yaml';
const __filesystem_name = '__putout_processor_filesystem';
const __ignore_name = '__putout_processor_ignore';

const __json = `${__json_name}(__object)`;
const __yaml = `${__yaml_name}(__object)`;
const __filesystem = `${__filesystem_name}(__object)`;
const __ignore = `${__ignore_name}(__array)`;

const TYPES = [
    __json_name,
    __yaml_name,
    __filesystem_name,
    __ignore_name,
];

module.exports.__json = __json;
module.exports.__yaml = __yaml;
module.exports.__filesystem = __filesystem;
module.exports.__ignore = __ignore;

module.exports.__json_name = __json_name;
module.exports.__yaml_name = __yaml_name;
module.exports.__filesystem_name = __filesystem_name;
module.exports.__ignore_name = __ignore_name;

module.exports.toJS = (source, name = __json) => {
    const prefix = createPrefix(name);
    const suffix = createSuffix();
    
    return `${prefix}${source}${suffix}`;
};

module.exports.fromJS = (source, name = __json) => {
    source = maybeNewline(source);
    const shortName = cut(name);
    
    source = source.slice(source.indexOf(shortName));
    
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
