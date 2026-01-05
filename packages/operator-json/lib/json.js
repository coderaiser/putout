import removeBlankLines from 'remove-blank-lines';

const cut = (a) => a.slice(0, a.indexOf('('));
const createPrefix = (name) => {
    if (name.includes('('))
        return `${cut(name)}(`;
    
    return `${name}(`;
};

const createSuffix = () => ');\n';
const maybeNewline = (a) => a.at(-1) === '\n' ? a : `${a}\n`;

export const __json_name = '__putout_processor_json';
export const __yaml_name = '__putout_processor_yaml';
export const __toml_name = '__putout_processor_toml';
export const __filesystem_name = '__putout_processor_filesystem';
export const __ignore_name = '__putout_processor_ignore';

export const __json = `${__json_name}(__object)`;
export const __yaml = `${__yaml_name}(__object)`;
export const __toml = `${__toml_name}(__object)`;
export const __filesystem = `${__filesystem_name}(__object)`;
export const __ignore = `${__ignore_name}(__array)`;

const TYPES = [
    __json_name,
    __yaml_name,
    __filesystem_name,
    __ignore_name,
];

export const toJS = (source, name = __json) => {
    const prefix = createPrefix(name);
    const suffix = createSuffix();
    
    return `${prefix}${source}${suffix}`;
};

export const fromJS = (source, name = __json) => {
    source = maybeNewline(source);
    const shortName = cut(name);
    
    source = source.slice(source.indexOf(shortName));
    
    const prefix = createPrefix(name);
    const suffix = createSuffix();
    const length = source.length - suffix.length;
    const sliced = source.slice(prefix.length, length);
    
    return maybeNewline(removeBlankLines(sliced));
};

export const isJSON = (source) => {
    for (const type of TYPES) {
        if (!source.indexOf(type))
            return true;
    }
    
    return false;
};
