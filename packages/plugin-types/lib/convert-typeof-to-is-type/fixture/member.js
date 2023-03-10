const fn = (node) => {
    if (typeof node.end === 'number')
        return true;
    
    return false;
}
