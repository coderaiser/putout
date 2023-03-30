for (const [i, token] of entries(tokens)) {
    if (!i)
        continue;
    
    fn(token);
}

for (const [index, token] of entries(tokens)) {
    if (index > n)
        continue;
    
    fn(token);
}
