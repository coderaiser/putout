if (isObjectPattern(node.id)) {
    idPath.traverse({});
} else if (idPath.isArrayPattern()) {
    const elements = idPath.get('elements');
    
    for (const elPath of elements) {}
}

