'use strict';

module.exports.setLiteralValue = (path, newValue) => {
    const node = path.node || path;
    const {raw, value} = node;
    
    node.value = value.replace(value, newValue);
    node.raw = raw.replace(value, newValue);
};
