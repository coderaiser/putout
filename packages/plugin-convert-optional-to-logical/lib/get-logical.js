'use strict';

module.exports.getLogical = (path, {assign} = {}) => {
    const list = path
        .toString()
        .split('?.');
    
    const n = list.length;
    let [member] = list;
    let i = assign ? 1 : 0;
    const logical = [member];
    
    while (++i < n) {
        member += compute(member, list[i]);
        logical.push(member);
    }
    
    const fullLogical = logical.join(' && ');
    
    if (!assign)
        return fullLogical;
    
    return `${fullLogical} && (${logical.at(-1)} = __a)`;
};

function compute(member, current) {
    if (current[0] === '(')
        return current;
    
    if (current[0] === '[')
        return current;
    
    return `.${current}`;
}
