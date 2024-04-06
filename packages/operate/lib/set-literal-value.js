'use strict';

module.exports.setLiteralValue = (path, newValue) => {
    const node = path.node || path;
    const {
        raw,
        extra,
        value,
    } = node;
    
    node.value = value.replace(value, newValue);
    
    if (raw === '""') {
        node.raw = raw.replace(raw, `"${newValue}"`);
        return;
    }
    
    if (raw) {
        node.raw = `'` + String.raw`${newValue}` + `'`;
        return;
    }
    
    if (extra) {
        node.raw = extra.raw.replace(value, newValue);
        node.extra.rawValue = value;
    }
};
