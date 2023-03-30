for (const [i, token] of tokens.entries()) {
    if (!i)
        continue;
    
    fn(token);
}

for (const [index, token] of tokens.entries()) {
    if (index > n)
        continue;
    
    fn(token);
}
