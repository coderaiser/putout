const isString = (a) => typeof a === 'string';

export const check = (options) => {
    if (!options || typeof options !== 'object')
        throw Error('options should be an object!');
};

export const checkRule = (rule) => {
    if (!isString(rule))
        throw Error(`☝️ Looks like plugin name type is not 'string', but: '${typeof rule}'`);
};
