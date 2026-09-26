export const indentCodeblock = (a, prefixCount = 4) => {
    const lines = a.split('\n');
    const result = [''];
    
    const prefix = ' '.repeat(prefixCount * 2);
    const suffix = ' '.repeat(prefixCount);
    
    for (const line of lines) {
        result.push(`${prefix}${line}`);
    }
    
    result.push(suffix);
    
    return result.join('\n');
};
