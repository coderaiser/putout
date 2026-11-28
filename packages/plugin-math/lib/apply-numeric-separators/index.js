const PREFIX = /^(0[box])/i;
const IS_BINARY = /^0b/i;
const IS_OCTAL = /^0o/i;

export const report = ({path, split}) => {
    const {raw} = path.node;
    return `Use numeric separators: '${raw}' -> '${split}'`;
};

export const fix = ({path, split}) => {
    const {node} = path;
    
    node.raw = split;
    node.value = split;
};

export const traverse = ({push}) => ({
    NumericLiteral(path) {
        const {node} = path;
        const raw = node.raw || String(node.value);
        
        if (raw.length < 5)
            return;
        
        if (raw.includes('_'))
            return;
        
        if (raw.includes('.'))
            return;
        
        const prefixMatch = raw.match(PREFIX);
        
        if (prefixMatch) {
            const split = splitPrefixed(raw, prefixMatch[1]);
            
            if (!split)
                return;
            
            push({
                path,
                split,
            });
            
            return;
        }
        
        push({
            path,
            split: splitDigits(raw, 3),
        });
    },
});

function splitPrefixed(raw, prefix) {
    const digits = raw.slice(prefix.length);
    const groupSize = IS_BINARY.test(prefix) ? 4 : IS_OCTAL.test(prefix) ? 3 : 4;
    
    if (digits.length < groupSize * 2)
        return null;
    
    return prefix + splitDigits(digits, groupSize);
}

function splitDigits(str, groupSize) {
    const n = str.length - 1;
    let i = str.length;
    const result = [];
    
    while (--i > -1) {
        const a = n - i;
        
        if (a && !(a % groupSize))
            result.unshift('_');
        
        result.unshift(str.charAt(i));
    }
    
    return result.join('');
}
