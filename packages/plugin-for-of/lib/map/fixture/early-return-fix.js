{
    const args = [];
    
    for (const arg of params) {
        if (arg === where) {
            args.push(createWhere(arg));
            continue;
        }
        
        args.push(cloneNode(arg));
    }
}
