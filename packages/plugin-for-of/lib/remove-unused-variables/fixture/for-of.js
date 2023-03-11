for (const param of params) {
    const {typeName} = param;
    const {name} = typeName;
    
    const current = store(name);
    
    if (!current)
        return;
    
    current.nodes.push(typeName);
}
