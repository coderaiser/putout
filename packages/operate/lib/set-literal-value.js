import {types} from '@putout/babel';

const {
    isNumericLiteral,
    isStringLiteral,
} = types;

export const setLiteralValue = (path, newValue) => {
    const node = path.node || path;
    
    if (isNumericLiteral(node)) {
        node.value = newValue;
        node.raw = newValue;
        
        return;
    }
    
    if (isStringLiteral(node))
        setStringLiteral(node, newValue);
};

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
