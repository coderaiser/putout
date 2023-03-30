for (const [i, token] of tokens.entries()) {
    if (!i)
        continue;
    
    fn(token);
}

for (const [i, token] of tokens.entries()) {
    if (i > n)
        continue;
    
    fn(token);
}
