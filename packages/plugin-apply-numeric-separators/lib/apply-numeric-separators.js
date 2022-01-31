'use strict';

module.exports.report = () => `Numeric separators should be used`;

const MIN = 9999;

module.exports.fix = ({node}) => {
    const {raw} = node;
    
    node.raw = split(raw);
    node.value = split(raw);
};

module.exports.traverse = ({push}) => ({
    NumericLiteral(path) {
        const {node} = path;
        node.raw = node.raw || String(node.value);
        const {raw, value} = path.node;
        
        if (/^0x/.test(raw))
            return;
        
        if (raw.includes('_'))
            return;
        
        if (value <= MIN)
            return;
        
        push(path);
    },
});

function split(str) {
    const n = str.length - 1;
    let i = str.length;
    const result = [];
    
    while (--i > -1) {
        const a = n - i;
        
        if (a && a % 3 === 0)
            result.unshift('_');
        
        result.unshift(str.charAt(i));
    }
    
    return result.join('');
}

