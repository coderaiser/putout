let i = 0;

while (i < node.signature.params.length) {
    const p = node.signature.params[i];
    
    params.push(identifier(p.name.value));

    i = i + 1;
}

let j = 0;

while (j < node.signature.params.length) {
    const p = node.signature.params[j];
    
    params.push(identifier(p.name.value));

    ++j;
}

let k = 0;

while (k < node.signature.params.length) {
    const p = node.signature.params[k];
    
    params.push(identifier(p.name.value));

    k++;
}
