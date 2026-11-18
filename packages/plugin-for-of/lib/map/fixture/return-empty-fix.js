const args = [];

for (const arg of params) {
    if (arg) {
        args.push(undefined);
        continue;
    }
    
    args.push(arg);
}
