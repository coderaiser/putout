const args = params.map((arg) => {
    if (arg === where)
        return createWhere(arg);
    
    return cloneNode(arg);
});
