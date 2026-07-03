while (i < node.signature.params.length) {
    const p = node.signature.params[i];
    
    params.push(identifier(p.name.value));

    i = i + 1;
}
