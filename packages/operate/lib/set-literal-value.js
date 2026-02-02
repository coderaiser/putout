import {types} from '@putout/babel';

const {
    isNumericLiteral,
    isStringLiteral,
} = types;

export const setLiteralValue = (path, newValue) => {
    const node = path.node || path;
    
    if (isNumericLiteral(node)) {
        setNumericLiteral(node, newValue);
        return;
    }
    
    if (isStringLiteral(node))
        setStringLiteral(node, newValue);
};

function setNumericLiteral(node, newValue) {
    const raw = String(newValue);
    
    node.value = newValue;
    node.raw = raw;
    node.extra.rawValue = newValue;
    node.extra.raw = raw;
    
    return;
}

function setStringLiteral(node, newValue) {
    const {
        raw,
        extra,
        value,
    } = node;
    
    node.value = newValue;
    
    if (raw === '""') {
        node.raw = raw.replace(raw, `"${newValue}"`);
        return;
    }
    
    if (raw || !value) {
        node.raw = `'` + String.raw`${newValue}` + `'`;
        return;
    }
    
    if (extra) {
        node.raw = extra.raw.replace(value, newValue);
        node.extra.rawValue = value;
    }
}
