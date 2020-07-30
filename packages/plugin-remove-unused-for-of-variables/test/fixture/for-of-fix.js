for (const {
    typeName
} of params) {
    const {name} = typeName;

    const current = store(name);

    if (!current)
        return;

    current.nodes.push(typeName);
}
