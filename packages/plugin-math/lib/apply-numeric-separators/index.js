export const report = ({path, splited}) => {
    const {value} = path.node;
    return `Use numeric separators: '${value}' -> '${splited}'`;
};

export const fix = ({path, splited}) => {
    const {node} = path;
    
    node.raw = splited;
    node.value = splited;
};

export const traverse = ({push}) => ({
    NumericLiteral(path) {
        const {node} = path;
        const raw = node.raw || String(node.value);
        
        if (raw.length < 5)
            return;
        
        if (raw.startsWith('0x'))
            return;
        
        if (raw.includes('_'))
            return;
        
        if (raw.includes('.'))
            return;
        
        if (raw.includes('o'))
            return;
        
        push({
            path,
            splited: split(raw),
        });
    },
});

function split(str) {
    const n = str.length - 1;
    let i = str.length;
    const result = [];
    
    while (--i > -1) {
        const a = n - i;
        
        if (a && !(a % 3))
            result.unshift('_');
        
        result.unshift(str.charAt(i));
    }
    
    return result.join('');
}
