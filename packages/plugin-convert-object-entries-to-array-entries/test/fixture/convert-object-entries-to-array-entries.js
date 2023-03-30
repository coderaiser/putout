for (const [i, token] of entries(tokens)) {
    if (!i)
        continue;
    
    fn(token);
}

for (const [i, token] of entries(tokens)) {
    if (i > n)
        continue;
    
    fn(token);
}
