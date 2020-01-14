'use strict';

module.exports.report = () => `Numeric separators should be used`;

const MAX = 1_000;

module.exports.fix = (path) => {
    const {node} = path;
    const {raw} = node;
    
    node.raw = split(raw);
    node.value = split(raw);
};

module.exports.traverse = ({push}) => {
    return {
        NumericLiteral(path) {
            const {raw, value} = path.node;
            
            if (raw.includes('_'))
                return;
            
            if (value < MAX)
                return;
            
            push(path);
        },
    };
};

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

