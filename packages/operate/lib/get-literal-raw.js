'use strict';

const isString = (a) => typeof a === 'string';

module.exports.getLiteralRaw = (path) => {
    const node = path.node || path;
    const {raw, extra} = node;
    
    if (isString(node.raw))
        return node.raw;
    
    return raw || extra.raw;
};
