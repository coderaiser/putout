export const getLogical = (path, {assign = false} = {}) => {
    const list = path
        .toString()
        .split('?.');
    
    const n = list.length;
    let [member] = list;
    let i = Number(assign);
    const logical = [member];
    
    while (++i < n) {
        member += compute(list[i]);
        logical.push(member);
    }
    
    const fullLogical = logical.join(' && ');
    
    if (!assign)
        return fullLogical;
    
    return `${fullLogical} && (${logical.at(-1)} = __a)`;
};

function compute(current) {
    if (current[0] === '(')
        return current;
    
    if (current[0] === '[')
        return current;
    
    return `.${current}`;
}
