let i = 0;

while (i < node.signature.params.length) {
    const p = node.signature.params[i];
    
    params.push(identifier(p.name.value));
}
